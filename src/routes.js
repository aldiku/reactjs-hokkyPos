
/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Login from "views/pages/login/Index.js";
import Dashboard from "views/pages/dashboard/Index.js";
import Users from "views/pages/user/Index2.js";
import CreateUser from "views/pages/user/Create.js";
import EditUser from "views/pages/user/Edit2.js";
import EditPrivileges from "views/pages/user/privileges/Edit.js";

import karyawanbaru from "views/pages/karyawanbaru/Index"
import CreateKaryawanBaru from "views/pages/karyawanbaru/Create";

import Alamat from "views/pages/address/Index.js";
import CreateAlamat from "views/pages/address/Create.js";
import EditAlamat from "views/pages/address/Edit.js";

// import Aplikator from "views/pages/aplikator/Index";
// import CreateAplikator from "views/pages/aplikator/Create.js";

import Account from "views/pages/account/Index.js";
import CreateAccount from "views/pages/account/Create.js";
import EditAccount from "views/pages/account/Edit.js";

import Bank from "views/pages/bank/Index.js";
import CreateBank from "views/pages/bank/Create";
import EditBank from "views/pages/bank/Edit";

import Asset from "views/pages/asset/Index.js";
import CreateAsset from "views/pages/asset/Create.js";
import EditAsset from "views/pages/asset/Edit.js";

import TypeAsset from "views/pages/asset/type/Index.js";
import CreateTypeAsset from "views/pages/asset/type/Create.js";
import EditTypeAsset from "views/pages/asset/type/Edit.js";

import Uom from "views/pages/satuan/Index.js";
import CreateUom from "views/pages/satuan/Create";
import EditUom from "views/pages/satuan/Edit.js";

import Customer from "views/pages/Customer/Index.js";
import CreateCustomer from "views/pages/Customer/Create.js";
import EditCustomer from "views/pages/Customer/Edit2.js";

import Coa from "views/pages/coa/Index.js";
import CreateCoa from "views/pages/coa/Create.js";
import EditCoa from "views/pages/coa/Edit.js";

import CreateItem from "views/pages/item/itemMain/Create.js";
import EditItem from "views/pages/item/itemMain/Edit3";
import ItemMain from "views/pages/item/itemMain/Index4.js";
import DetailItems from "views/pages/item/itemMain/detail/Index.js";

import ItemCategory from "views/pages/item/itemCategory/Index.js";
import CreateItemCategory from "views/pages/item/itemCategory/Create.js";
import EditItemCategory from "views/pages/item/itemCategory/Edit.js";
import EditWarehousePusat from "views/pages/warehouse/WarehousePusat/Edit.js";

import warehousetoko from "views/pages/warehouse/WarehouseToko/Index.js";
import EditWarehouseToko from "views/pages/warehouse/WarehouseToko/Edit.js";

import warehousegudang from "views/pages/warehouse/WarehouseGudang/Index.js";
import EditWarehouseGudang from "views/pages/warehouse/WarehouseGudang/Edit.js";

//warehouse pusat
import WarehousePusat from "views/pages/warehousePusat/Index.js";
import CreateAll from "views/pages/warehousePusat/AllCreate"
import CreateWarehousePusat from "views/pages/warehousePusat/Create.js";
import CreateWarehouseToko from "views/pages/warehouseToko/Create.js";
import CreateWarehouseGudang from "views/pages/warehouseGudang/Create.js";
import EditWarehouseaAll from "views/pages/warehousePusat/Edit"

//warehouse All
import WarehousePagePusat from "views/pages/warehouseAll/Index1.js"
import WarehousePageToko from "views/pages/warehouseAll/Index2.js"
import WarehousePageGudang from "views/pages/warehouseAll/Index3.js"

import ItemSubCategory from "views/pages/item/itemSubCategory/Index.js";
import CreateItemSubCategory from "views/pages/item/itemSubCategory/Create.js";

import Pelunasan from "views/pages/so/PelunasanKasir/Index.js"
import PelunasanEdit from "views/pages/so/PelunasanKasir/Edit"

import ItemFunction from "views/pages/item/itemFunction/Index.js";
import CreateItemFunction from "views/pages/item/itemFunction/Create.js";

import ItemSubFunction from "views/pages/item/itemSubFunction/Index.js";
import CreateItemSubFunction from "views/pages/item/itemSubFunction/Create.js";

import ItemMerek from "views/pages/item/itemMerek/Index.js";
import CreateItemMerek from "views/pages/item/itemMerek/Create.js";

import ItemSubMerek from "views/pages/item/itemSubMerek/Index.js";
import CreateItemSubMerek from "views/pages/item/itemSubMerek/Create.js";

import ItemGrade from "views/pages/item/itemGrade/Index.js";
import CreateItemGrade from "views/pages/item/itemGrade/Create.js";

import EditKaryawan from "views/pages/karyawanbaru/Edit.js";

import Person from "views/pages/person/Index2.js";
import CreatePerson from "views/pages/person/Create.js";
import EditPerson from "views/pages/person/Edit2";

import Pajak from "views/pages/pajak/Index.js";
import CreatePajak from "views/pages/pajak/Create.js";
import EditPajak from "views/pages/pajak/Edit.js";

import Rak from "views/pages/Rak/Index2.js";
import CreateRak from "views/pages/Rak/Create";
import EditRak from "views/pages/Rak/Edit.js";


import So from "views/pages/so/Index.js";

import ValidasiSo from "views/pages/so/ValidasiSo/Index.js";
import EditValidasiSo from "views/pages/so/ValidasiSo/Edit.js";

import AdminApproveSo from "views/pages/so/AdminApprove/Index.js";
import EditAdminApproveSo from "views/pages/so/AdminApprove/Edit.js";

import PimpinanSo from "views/pages/so/ValidatorSo/Index.js";
import EditPimpinanSo from "views/pages/so/ValidatorSo/Edit.js";

import CetakSo from "views/pages/so/CetakSo/Cetak";

import CreateSo from "views/pages/so/Create.js";
import EditSo from "views/pages/so/Edit.js";

import SoKasir from "views/pages/so/soKasirBaru/Index2";

import KasirSettlement from "views/pages/so/Kasir/Index.js";
import CreateKasirSettlement from "views/pages/so/Kasir/Create.js";
import DetailKasirSettlement from "views/pages/so/Kasir/Detail.js";

import DetailClosingKasir from "views/pages/so/ClosingKasir/Detail";


import Promo from "views/pages/promo/Index.js";
import CreatePromo from "views/pages/promo/PromoItem/Create";
import CreatePromo1 from "views/pages/promo/PromoKategori/Create";
import CreatePromo2 from "views/pages/promo/PromoTransaksi/Create";
import EditPromo from "views/pages/promo/Edit.js";

import MainJangka  from "views/pages/jangkaWaktu/Index";
import CreateJangkaWaktu from "views/pages/jangkaWaktu/Create";
import EditJangkaWaktu from "views/pages/jangkaWaktu/Edit";

import BuktiKasMasuk from "views/pages/so/BuktiKasMasuk/Index.js";
import CreateBuktiKasMasuk from "views/pages/so/BuktiKasMasuk/BuktiKasMasuk/Create.js";
import DetailBuktiKasMasuk from "views/pages/so/BuktiKasMasuk/BuktiKasMasuk/Detail.js";
import ValidasiAdminFinanceBkm from "views/pages/so/BuktiKasMasuk/ValidasiAdminFinance/Edit.js";
import ValidasiDirekturBkm from "views/pages/so/BuktiKasMasuk/ValidasiDirekturBKM/Edit.js";

import PermintaanBarangSo from "views/pages/so/PermintaanBarang/Index.js";
import CreatePermintaanBarangSo from "views/pages/so/PermintaanBarang/PermintaanBarang/Create.js";
import DetailPermintaanBarangSo from "views/pages/so/PermintaanBarang/PermintaanBarang/Detail.js";

import EditPermintaanBarangSo from "views/pages/so/PermintaanBarang/PermintaanBarang/Edit.js";
import ValidasiPermintaanBarangSo from "views/pages/so/PermintaanBarang/ValidasiPermintaanBarang/Index.js";
import EditValidasiPermintaanBarangSo from "views/pages/so/PermintaanBarang/ValidasiPermintaanBarang/Edit.js";

import CreatePenawaranSo from "views/pages/so/PenawaranSo/Create.js"
import EditPenawaranSo from "views/pages/so/PenawaranSo/Edit.js";
import DetailPenawaranSo from "views/pages/so/PenawaranSo/Detail.js";

import SuratJalanSo from "views/pages/so/SuratJalanSo/Index.js";
import CreateSuratJalanSo from "views/pages/so/SuratJalanSo/SuratJalanSo/Create.js";
import EditSuratJalanSo from "views/pages/so/SuratJalanSo/SuratJalanSo/Edit.js";
import DetailSuratJalanSo from "views/pages/so/SuratJalanSo/SuratJalanSo/Detail.js";
import ValidasiSuratJalanSo from "views/pages/so/SuratJalanSo/ValidasiSuratJalanSo/Edit.js";
import CetakSuratJalan from "views/pages/so/SuratJalanSo/CetakSuratJalan/Cetak.js";

import InvoiceSo from "views/pages/so/InvoiceSo/Index.js";
import CreateInvoiceSo from "views/pages/so/InvoiceSo/InvoiceSo/Create.js"
import EditInvoiceSo from "views/pages/so/InvoiceSo/InvoiceSo/Edit.js"
import DetailInvoiceSo from "views/pages/so/InvoiceSo/InvoiceSo/Detail.js"
import Validasifinance from "views/pages/so/InvoiceSo/ValidasiInvoiceSo/Edit.js";
import ValidasiDirektur from "views/pages/so/InvoiceSo/ValidasiPemimpin/Edit.js";
import DetailInvoiceSoS from "views/pages/so/InvoiceSo/CetakInvoice/Detail"

import DurasiOperasional from "views/pages/durasiOperasional/Index";
import CreateDurasiOperasional from "views/pages/durasiOperasional/Create";
import EditDurasiOperasional from "views/pages/durasiOperasional/Edit";

import PasswordOperasional from "views/pages/durasiPassword/Index";
import EditPasswordOperasional from "views/pages/durasiPassword/Edit";

import CetakInvoiceSO from "views/pages/so/InvoiceSo/CetakInvoice/Cetak";

import CetakPenawaranBarang from "views/pages/so/PermintaanBarang/CetakPenawaranBarang/Cetak";
import CetakBuktiKasMasuk from "views/pages/so/BuktiKasMasuk/CetakBuktiKasMasuk/Cetak";

const routes = [
  {
    path: "/login",
    name: "Login",
    miniName: "L",
    component: Login,
    layout: "/auth",
    hidden: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    miniName: "D",
    component: Dashboard,
    layout: "/admin",
    hidden: true,
  },
  {
    collapse: true,
    name: "Master",
    icon: "ni ni-folder-17 text-yellow",
    state: "MasterCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      {
        path: "/warehouse-gudang/edit/:id",
        name: "Edit Warehouse Pusat",
        miniName: "EWP",
        component: EditWarehouseGudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-gudang/create",
        name: "Create Warehouse Pusat",
        miniName: "CWS",
        component: CreateWarehouseGudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-gudang",
        name: "Warehouse Gudang",
        miniName: "WT",
        component: warehousegudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-toko/edit/:id",
        name: "Edit Warehouse Toko",
        miniName: "EWT",
        component: EditWarehouseToko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-toko/create",
        name: "Create Warehouse Toko",
        miniName: "CWT",
        component: CreateWarehouseToko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-toko",
        name: "Warehouse Toko",
        miniName: "WT",
        component: warehousetoko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-pusat/edit/:id",
        name: "Edit Warehouse Pusat",
        miniName: "EWP",
        component: EditWarehousePusat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/gudang/create",
        name: "Create Warehouse Pusat",
        miniName: "CWS",
        component: CreateWarehouseGudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/toko/create",
        name: "Create Warehouse Pusat",
        miniName: "CWS",
        component: CreateWarehouseToko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/pusat/create",
        name: "Create Warehouse Pusat",
        miniName: "CWS",
        component: CreateWarehousePusat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/gudang",
        name: "Warehouse Gudang",
        miniName: "WT",
        component: WarehousePageGudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/toko",
        name: "Warehouse Toko",
        miniName: "WT",
        component: WarehousePageToko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/pusat",
        name: "Warehouse Pusat",
        miniName: "WT",
        component: WarehousePagePusat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/edit/:id",
        name: "Edit Warehouse Pusat",
        miniName: "EWP",
        component: EditWarehouseaAll,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/all/create",
        name: "Warehouse Pusat",
        miniName: "WT",
        component: CreateAll,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse",
        name: "Cabang",
        miniName: "W",
        component: WarehousePusat,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/price",
      //   name: "Price",
      //   miniName: "W",
      //   component: Price,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/rak/edit/:id",
        name: "Create Rak",
        miniName: "CTS",
        component: EditRak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/rak/create",
        name: "Create Rak",
        miniName: "CTS",
        component: CreateRak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/rak",
        name: "Lokasi Barang",
        miniName: "R",
        component: Rak,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/durasi-operasional/edit/:id",
        name: "Edit Durasi Operasional",
        miniName: "CTS",
        component: EditDurasiOperasional,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/durasi-operasional/create",
        name: "Create Durasi Operasional",
        miniName: "CTS",
        component: CreateDurasiOperasional,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/durasi-operasional",
        name: "Batas Waktu",
        miniName: "OD",
        component: DurasiOperasional,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/password-operasional/edit/:id",
        name: "Edit Durasi Operasional",
        miniName: "CTS",
        component: EditPasswordOperasional,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/password-operasional",
        name: " Validasi Password",
        miniName: "OD",
        component: PasswordOperasional,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/karyawan/edit/:id",
        name: "Edit Durasi Operasional",
        miniName: "CTS",
        component: EditKaryawan,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/karyawan/create",
        name: "Create karyawan",
        miniName: "CK",
        component: CreateKaryawanBaru,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/karyawan",
        name: "Karyawan",
        miniName: "U",
        component: karyawanbaru,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/user/edit/:id",
        name: "Edit User",
        miniName: "EU",
        component: EditUser,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/privileges/edit",
        name: "Edit Privileges",
        miniName: "EP",
        component: EditPrivileges,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/user/create",
        name: "Create User",
        miniName: "CU",
        component: CreateUser,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/user",
        name: "Users",
        miniName: "U",
        component: Users,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/alamat/edit/:id",
        name: "Edit Alamat",
        miniName: "EA",
        component: EditAlamat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/alamat/create",
        name: "Create Address",
        miniName: "CA",
        component: CreateAlamat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/alamat",
        name: "Alamat",
        miniName: "A",
        component: Alamat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/person/edit/:id",
        name: "Edit Person",
        miniName: "EP",
        component: EditPerson,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/person/create",
        name: "Create Person",
        miniName: "CP",
        component: CreatePerson,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/person",
        name: "Supplier",
        miniName: "P",
        component: Person,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/satuan/edit/:id",
        name: "Edit Satuan",
        miniName: "ES",
        component: EditUom,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/satuan/create",
        name: "Create Satuan",
        miniName: "CS",
        component: CreateUom,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/satuan",
        name: "Satuan",
        miniName: "S",
        component: Uom,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-grade/create",
        name: "Create Item Grade",
        miniName: "CIG",
        component: CreateItemGrade,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-grade",
        name: "Item Grade",
        miniName: "IG",
        component: ItemGrade,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-merek/create",
        name: "Create Item Sub Merek",
        miniName: "CISM",
        component: CreateItemSubMerek,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-merek",
        name: "Item Sub Merek",
        miniName: "ISM",
        component: ItemSubMerek,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-merek/create",
        name: "Create Item Merek",
        miniName: "CIM",
        component: CreateItemMerek,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-merek",
        name: "Item Merek",
        miniName: "IM",
        component: ItemMerek,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-function/create",
        name: "Create Item Sub Function",
        miniName: "CISK",
        component: CreateItemSubFunction,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-function",
        name: "Item Sub Function",
        miniName: "ISF",
        component: ItemSubFunction,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-function/create",
        name: "Create Item Function",
        miniName: "CSK",
        component: CreateItemFunction,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-function",
        name: "Item Function",
        miniName: "IF",
        component: ItemFunction,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-kategori/create",
        name: "Create Sub Kategori",
        miniName: "CSK",
        component: CreateItemSubCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-kategori",
        name: "Item Sub Kategori",
        miniName: "ISK",
        component: ItemSubCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-kategori/edit/:id",
        name: "Edit Item Kategori",
        miniName: "EIK",
        component: EditItemCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-kategori/create",
        name: "Create Kategori",
        miniName: "CK",
        component: CreateItemCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-kategori",
        name: "Item Kategori",
        miniName: "IK",
        component: ItemCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item/edit/:id",
        name: "Edit Item",
        miniName: "EI",
        component: EditItem,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item/details/:id",
        name: "Detail Item",
        miniName: "DI",
        component: DetailItems,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item/create",
        name: "Create Item",
        miniName: "CI",
        component: CreateItem,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item",
        name: "Item",
        miniName: "i",
        component: ItemMain,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/aplikator/create",
      //   name: "Create Item",
      //   miniName: "CI",
      //   component: CreateAplikator,
      //   layout: "/admin",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/aplikator",
      //   name: "Aplikator",
      //   miniName: "i",
      //   component: Aplikator,
      //   layout: "/admin",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/promo/edit/:id",
        name: "Edit Promo",
        miniName: "EP",
        component: EditPromo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/promo/create-transaksi",
        name: "Create Promo",
        miniName: "EP",
        component: CreatePromo2,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/promo/create-kategori",
        name: "Create Promo",
        miniName: "EP",
        component: CreatePromo1,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/promo/create",
        name: "Create Promo",
        miniName: "EP",
        component: CreatePromo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/promo",
        name: "Promo Toko",
        miniName: "P",
        component: Promo,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/customer/edit/:id",
        name: "Edit Customer",
        miniName: "EC",
        component: EditCustomer,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/customer/create",
        name: "Create Customer",
        miniName: "CC",
        component: CreateCustomer,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/customer",
        name: "Customer",
        miniName: "C",
        component: Customer,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pajak/edit/:id",
        name: "Edit Pajak",
        miniName: "EP",
        component: EditPajak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pajak/create",
        name: "Create Pajak",
        miniName: "CP",
        component: CreatePajak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pajak",
        name: "PPN",
        miniName: "P",
        component: Pajak,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/jangka-waktu/update/:id",
        name: "Update Jangka Waktu",
        miniName: "UJW",
        component: "",
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/jangka-waktu/edit/:id",
        name: "Edit Jangka Waktu",
        miniName: "CJW",
        component: EditJangkaWaktu,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/jangka-waktu/create",
        name: "Create Jangka Waktu",
        miniName: "CJW",
        component: CreateJangkaWaktu,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/jangka-waktu",
        name: "Jatuh Tempo",
        miniName: "JW",
        component: MainJangka,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },      
      {
        path: "/type-asset/edit/:id",
        name: "Edit Type Asset",
        miniName: "EA",
        component: EditTypeAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/type-asset/create",
        name: "Create Type Asset",
        miniName: "CA",
        component: CreateTypeAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/type-asset",
        name: "Type Asset",
        miniName: "A",
        component: TypeAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/asset/edit/:id",
        name: "Edit Asset",
        miniName: "EA",
        component: EditAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/asset/create",
        name: "Create Asset",
        miniName: "CA",
        component: CreateAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/asset",
        name: "Asset",
        miniName: "A",
        component: Asset,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bank/edit/:id",
        name: "Edit Bank",
        miniName: "CA",
        component: EditBank,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bank/create",
        name: "Create Bank",
        miniName: "CA",
        component: CreateBank,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bank",
        name: "Bank",
        miniName: "A",
        component: Bank,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/account/edit/:id",
        name: "Edit Account",
        miniName: "EA",
        component: EditAccount,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/account/create",
        name: "Create Account",
        miniName: "CA",
        component: CreateAccount,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/account",
        name: "Account",
        miniName: "A",
        component: Account,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/coa/edit/:id",
        name: "Edit COA",
        miniName: "EC",
        component: EditCoa,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/coa/create",
        name: "Create COA",
        miniName: "CC",
        component: CreateCoa,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/coa",
        name: "Coa",
        miniName: "C",
        component: Coa,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
    ],
  },
  {
    collapse: true,
    name: "Penjualan",
    icon: "ni ni-cart text-red",
    state: "SOCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      {
        path: "/kasir-sales-order/detail",
        name: "Detail Kasir Settlement",
        miniName: "SO",
        component: DetailKasirSettlement,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/kasir-sales-order/cetak",
      //   name: "Cetak",
      //   miniName: "SO",
      //   component: CetakSoKasir,
      //   layout: "/cetak",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/kasir-sales-order/so-kasir",
        name: "Kasir",
        miniName: "HSO",
        component: SoKasir,
        hidden: true,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-sales-order/modal",
        name: "Kasir Settlement",
        miniName: "SO",
        component: CreateKasirSettlement,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-sales-order/",
        name: "POS Kasir",
        miniName: "OK",
        component: KasirSettlement,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pelunasan/edit/:id",
        name: "Create Po Retur",
        miniName: "CPP",
        component: PelunasanEdit,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pelunasan",
        name: "Pelunasan",
        miniName: "SO",
        component: Pelunasan,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/closing-kasir/detail/:id",
        name: "Create Po Retur",
        miniName: "CPP",
        component: DetailClosingKasir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/closing-kasir/",
      //   name: "Closing Kasir",
      //   miniName: "OK",
      //   component: ClosingKasir,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/penawaran-barang/cetak/:id",
        name: "Edit Validasi Pimpinan So",
        miniName: "EVPS",
        component: CetakPenawaranBarang,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/so-validasi-penawaran-barang/edit/:id",
        name: "Edit Validasi Pimpinan So",
        miniName: "EVPS",
        component: EditValidasiPermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/so-validasi-penawaran-barang",
        name: " Validasi Pimpinan So",
        miniName: "EVPS",
        component: ValidasiPermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/edit/:id",
        name: "Edit Validasi Pimpinan So",
        miniName: "EVPS",
        component: EditPermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/detail/:id",
        name: "Detail Penawaran Barang",
        miniName: "SO",
        component: DetailPermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/create",
        name: "Penawaran Barang",
        miniName: "SO",
        component: CreatePermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang",
        name: "Penawaran",
        miniName: "SO",
        component: PermintaanBarangSo,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/cetak/:id",
        name: "Cetak So",
        miniName: "EVPS",
        component: CetakSo,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-pimpinan-so/edit/:id",
        name: "Edit Validasi Pimpinan So",
        miniName: "EVPS",
        component: EditPimpinanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validas-pimpinan-so",
        name: "Validasi Pimpinan SO",
        miniName: "VPS",
        component: PimpinanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-admin-so/edit/:id",
        name: "Edit Validasi Admin So",
        miniName: "EVAS",
        component: EditAdminApproveSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-admin-so",
        name: "Validasi Admin SO",
        miniName: "VAS",
        component: AdminApproveSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-penawaran-so/edit/:id",
        name: "Validasi Penawaran So",
        miniName: "VPS",
        component: EditValidasiSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-penawaran-so",
        name: "Validasi Penawaran So",
        miniName: "VPS",
        component: ValidasiSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/detail/:id",
        name: "Edit Sales Order",
        miniName: "ESO",
        component: EditSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/edit/:id",
        name: "Edit Sales Order",
        miniName: "ESO",
        component: EditSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/create",
        name: "Create Sales Order",
        miniName: "CSO",
        component: CreateSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/so-penawaran/detail/:id",
        name: "Edit Penawaran So",
        miniName: "CPP",
        component: DetailPenawaranSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/so-penawaran/edit/:id",
        name: "Edit Sales Order",
        miniName: "ESO",
        component: EditPenawaranSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/so-penawaran/create",
        name: "Create Penawaran So",
        miniName: "CPP",
        component: CreatePenawaranSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order",
        name: "Sales Order",
        miniName: "SO",
        component: So,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so/cetak/:id",
        name: "Edit Penawaran So",
        miniName: "CPP",
        component: CetakSuratJalan,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/validasi-surat-jalan-so/edit/:id",
        name: "Edit Penawaran So",
        miniName: "CPP",
        component: ValidasiSuratJalanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so/detail/:id",
        name: "Detail Penawaran So",
        miniName: "CPP",
        component: DetailSuratJalanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so/edit/:id",
        name: "Edit Penawaran So",
        miniName: "CPP",
        component: EditSuratJalanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so/create",
        name: "Create Penawaran So",
        miniName: "CPP",
        component: CreateSuratJalanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so",
        name: "Surat Jalan",
        miniName: "SO",
        component: SuratJalanSo,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/cetak/:id",
        name: "Create Invoice So",
        miniName: "CPP",
        component: CetakInvoiceSO,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/detail-invoice/:id",
        name: "Create Invoice So",
        miniName: "CPP",
        component: DetailInvoiceSoS,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/validasi-direktur/edit/:id",
        name: "Create Invoice So",
        miniName: "CPP",
        component: ValidasiDirektur,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/validasi-invoice-so/edit/:id",
        name: "Create Invoice So",
        miniName: "CPP",
        component: Validasifinance,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/detail/:id",
        name: "Create Invoice So",
        miniName: "CPP",
        component: DetailInvoiceSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/edit/:id",
        name: "Create Invoice So",
        miniName: "CPP",
        component: EditInvoiceSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/create",
        name: "Create Invoice So",
        miniName: "CPP",
        component: CreateInvoiceSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so",
        name: "Invoice",
        miniName: "SO",
        component: InvoiceSo,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-masuk/cetak/:id",
        name: "Validasi Direktur",
        miniName: "CPP",
        component: CetakBuktiKasMasuk,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-masuk/validasi-direktur/validasi/:id",
        name: "Validasi Direktur",
        miniName: "CPP",
        component: ValidasiDirekturBkm,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-masuk/validasi-kepala-finance/validasi/:id",
        name: "Validasi kepala finance",
        miniName: "CPP",
        component: ValidasiAdminFinanceBkm,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-masuk/detail/:id",
        name: "Detail Bukti kas Masuk",
        miniName: "CPP",
        component: DetailBuktiKasMasuk,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-masuk/create",
        name: "Create bukti kas keluar",
        miniName: "CPP",
        component: CreateBuktiKasMasuk,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-masuk",
        name: "Bukti Kas Masuk",
        miniName: "BKM",
        component: BuktiKasMasuk,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/so-return",
      //   name: "SO Retur",
      //   miniName: "BKM",
      //   component: "",
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
    ],
  },
];

export default routes;
