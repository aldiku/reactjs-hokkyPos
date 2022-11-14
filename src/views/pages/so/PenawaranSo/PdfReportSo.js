import React, { useEffect, useState } from 'react';

import { Page, Text, Document, StyleSheet, Image, View } from "@react-pdf/renderer";
import logo from '../../../../assets/img/brand/Hokky1.png'
import {Table, TableBody, TableCell, TableHeader,DataTableCell } from '@david.kucsai/react-pdf-table';
import axios from 'axios';


const s = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
    flex: {
        flex: 1
    }, 
    flexRow: {
        flexDirection: 'row'
    },
    flexColumn: {
        flexDirection: 'column'
    },
    itemsCenter: {
        alignItems: 'center',
    },
    flexAround:{
        flexDirection:'row',
        justifyContent: 'space-around'
    }, 
    flexBetween:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    fs08:{
        fontSize: 8
    },
    fs10:{
        fontSize: 10
    },
    fs11:{
        fontSize: 11
    },
    fs16:{
        fontSize: 16
    },
    fs18:{
        fontSize: 18
    },
    fs22:{
        fontSize: 22
    },
    textMuted:{
        color:'#7E6767'
    },
    textCenter:{
        alignContent:'center',
        alignItems: 'center',
        textAlign:'center'
    },
    borderBottom:{
        borderBottomWidth: 1,
        borderColor: '#000'
    },
    my1:{
        marginTop: 10,
        marginBottom:10
    },
    px02:{
        paddingHorizontal: 2,
    },
    ml02:{
        marginLeft: 2,
    },
  });


const PdfReportSo = ({data}) => {
    const [allPenawaranSo, setAllPenawaranSo] = useState([]);
    const today = new Date();
    const warehouse = parseInt(localStorage.warehouse);
    const token = localStorage.token;
    useEffect(() => {
        getPenawaranSo(data.status, data.start='',data.end='',data.statusph='');
        return () => {
            setAllPenawaranSo([]); 
        };
    }, []);

    async function getPenawaranSo(status = null, start='',end='',statusph=''){
        let filter = { 
          per_page: 1000,
          warehouse_id : parseInt(warehouse)
        };
        if (status !== null) {
          filter = Object.assign(filter, { status: status })
        }
     
        if (start !== '') {
          filter = Object.assign(filter, { start_date: start })
        }
        if (end !== '') {
          filter = Object.assign(filter, { end_date: end })
        }
        if (statusph !== '') {
          filter = Object.assign(filter, { statusph: statusph })
        }
        const data = filter;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/page`, data, {
            headers,
          })
          .then((data) => {
            setAllPenawaranSo(data.data.response);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    return (
    <Document>
        <Page style={s.body}>
        <View style={[s.flexBetween, s.itemsCenter]}>
            <View>
                <Image src={logo} style={{height: 80, width: 110}}/>
            </View>
            <View>
                <Text style={s.fs16}>Hoky Bangunan</Text>
                <Text style={s.fs11}>Alamat Jalan Merbabu 2, Salatiga</Text>
                <Text style={s.fs11}>Telp: 085725361818</Text>
            </View>
        </View>
        <Text style={[s.textCenter,s.fs18,s.borderBottom, s.my1]}>Laporan Sales Order</Text>
        <View style={[s.flexBetween, s.my1]}>
            <View>
                <Text style={s.fs10}>Start Date : {(data.start != '') ? data.start : '' }</Text>
                <Text style={s.fs10}>End Date : {(data.end != '') ? data.end : '' }</Text>
            </View>
            <View>
                <Text style={s.fs10}>Nama : {localStorage.name}</Text>
                <Text style={s.fs10}>Tanggal Cetak : {today.toDateString()}</Text>
            </View>
        </View>
        <Table data={allPenawaranSo} style={s.my1}>
                <TableHeader textAlign={"center"}>
                    <TableCell style={s.fs08}>So Code</TableCell>
                    <TableCell style={s.fs08}>Address</TableCell>
                    <TableCell weighting={0.3} style={s.fs08}>QTY</TableCell>
                    <TableCell weighting={0.4} style={s.fs08}>Total</TableCell>
                    <TableCell style={s.fs08}>Diskon</TableCell>
                    <TableCell style={s.fs08}>Ongkir</TableCell>
                    <TableCell style={s.fs08}>Harga Payment</TableCell>
                    <TableCell style={s.fs08}>Keterangan</TableCell>
                </TableHeader>
                <TableBody  textAlign={"center"} >
                    <DataTableCell getContent={(r) => r.so_code}  style={s.fs08}/>
                    <DataTableCell getContent={(r) => r.manual_address}  style={s.fs08}/>
                    <DataTableCell weighting={0.3} getContent={(r) => r.qty_total} style={[s.fs08,s.textCenter]}/>
                    <DataTableCell weighting={0.4} getContent={(r) => r.price_total} style={[s.fs08,s.textCenter]}/>
                    <DataTableCell getContent={(r) => r.diskon_total} style={[s.fs08,s.textCenter]}/>
                    <DataTableCell getContent={(r) => r.ongkir} style={[s.fs08,s.textCenter]}/>
                    <DataTableCell getContent={(r) => r.payment_total} style={[s.fs08,s.textCenter]}/>
                    <DataTableCell getContent={(r) => r.keterangan} style={[s.fs08]}/>
                </TableBody>
            </Table>
        <View style={[s.flex,s.flexBetween, s.my1]}>
            <View>
                <Text style={s.fs10}>Di Download Oleh : {localStorage.name}</Text>
            </View>
            <View>
                <Text style={s.fs10}>Tanggal Download : {today.toDateString()}</Text>
            </View>
        </View>
        <Text
            style={s.pageNumber}
            render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
            }
        />
        </Page>
    </Document>
    );
}

export default PdfReportSo;