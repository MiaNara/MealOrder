import React, { useState } from "react";
import { Container, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Category from "./Category";
import { useEffect } from "react";
import axios from 'axios';
import Layout from "../layout/Layout";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from '../ConfirmDialog';
import { TableHeaderStyled } from "../style/TableStyle";

export default function ListCategory() {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const getAPI = () => {
    axios.get(`${DOMAIN}/api/category/getall`)
      .then(response => {
        setData(response.data.listdata);
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    getAPI()
  }, [])

  const [data, setData] = useState([]);

  let count = 1;
  const childDelete = (deleted) => {
    if (deleted) {
      getAPI()
    }
  }
  // const foodAdded = (added) => {
  //   if (added) {
  //     getAPI()
  //   }
  // }
  const deleteAll = () => {
    const deleteData = {
      "categoryId": data.map((cate) => { return cate.id })
    }
    console.log(deleteData)
    axios.delete(`${DOMAIN}/api/category/delete`, { data: deleteData })
      .then(response => {
        getAPI()
        console.log(response)
        toast.success("Xóa thành công")
      })
      .catch(err => {
        toast.error("Xóa thất bại")
      })
  }

  return (
    <Layout>
      <Container sx={{ minHeight: '75vh', marginTop: '6rem' }}>
        <Grid2 container>
          <Grid2 xs={6}>
          </Grid2>
          <Grid2 xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableHeaderStyled align="center" sx={{ width: '13%' }}>STT</TableHeaderStyled>
                    <TableHeaderStyled align="left" sx={{ width: '35%' }}>Tên món ăn</TableHeaderStyled>
                    <TableHeaderStyled align="left">Đơn giá</TableHeaderStyled>
                    <TableHeaderStyled align="center">&emsp;&emsp;&emsp;
                      <ConfirmDialog name="món ăn trong thực đơn" deleteAll={deleteAll} />
                    </TableHeaderStyled>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((category) => (
                    <Category key={category.id} category={category} childDelete={childDelete} listCateData={data} count={count++} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
        </Grid2>

      </Container>
    </Layout>
  );
}
