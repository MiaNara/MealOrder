import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Date from "./Date";
import Layout from "../layout/Layout";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ExportExcelModal from "../export/ExportExcelModal";
import dayjs from 'dayjs';
import axios from 'axios';
import { formatCurrency } from "../utils/Price";
import { shortenString } from "../utils/Name";
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from "@mui/material";
function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Report() {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const [value, setValue] = React.useState(0);
  const [billList, setBillList] = React.useState([{ total: 'Đang tải dữ liệu', orderDate: null }]);
  const [billSumList, setBillSumList] = React.useState([{ total: 'Đang tải dữ liệu' }]);
  const initValues = {
    startDate: dayjs().subtract(1, 'day'),
    endDate: dayjs()
  }
  const [fromDate, setFromDate] = React.useState(initValues.startDate);
  const [toDate, setToDate] = React.useState(initValues.endDate);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getBillsByRangeDate = async (fDate, tDate) => {
    const fromDate = dayjs(fDate).format('YYYY-MM-DD');
    const toDate = dayjs(tDate).format('YYYY-MM-DD');
    await axios.get(`${DOMAIN}/api/bill/getAllByRangeDate?fromDate=${fromDate}&toDate=${toDate}`)
      .then(res => {
        if (res.data.length !== 0) {
          setBillList(res.data.listBill);
          setBillSumList(res.data.listSumPriceByAccount);
        }
        else {
          setBillList([]);
          setBillSumList([]);
        }

      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    getBillsByRangeDate(fromDate, toDate);
  }, [fromDate, toDate])
  return (
    <Layout>
      <Container sx={{ minHeight: "75vh", marginTop: { md: "6rem", xs: '4rem' } }}>
        <Grid2 container>
          <Grid2 xs={12}>
            <ExportExcelModal fromDate={fromDate} toDate={toDate} />
          </Grid2>
          <Grid2 xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Date setFromDate={setFromDate} setToDate={setToDate} />
          </Grid2>
          <Grid2 xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
            <Box sx={{ width: { xs: '100%', md: '80%' }, marginTop: "10px" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Tất cả các đơn" {...a11yProps(0)} />
                  <Tab label="Thống kê theo tài khoản" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0} >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="left">Tài khoản</TableCell>
                        <TableCell align="left">Tên món</TableCell>
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="center">Đơn giá</TableCell>
                        <TableCell align="left">Ngày đặt</TableCell>
                        <TableCell align="left">Ghi chú</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {billList && billList.length === 0 ?
                        <TableRow>
                          <TableCell align="center" colSpan={7}>Không có đơn nào trong khoảng thời gian này</TableCell>
                        </TableRow> : <>
                          {billList.map((item, index) => {
                            return (
                              <TableRow key={index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                              >
                                <TableCell align="center"  >{index + 1}</TableCell>
                                <TableCell align="left"  >{item.account}</TableCell>
                                <TableCell align="left"  >{item.foodName && shortenString(item.foodName, 15)}</TableCell>
                                <TableCell align="center"  >{item.total}</TableCell>
                                <TableCell align="center"  >{item.price && formatCurrency(item.price)}</TableCell>
                                <TableCell align="left"  >{item.orderDate && dayjs(item.orderDate).format('DD/MM/YYYY')}</TableCell>
                                <TableCell align="left"  >{item.note && shortenString(item.note, 15)}</TableCell>
                              </TableRow>
                            );
                          })}</>
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="left">Tài khoản</TableCell>
                        <TableCell align="center">Tổng số lượng</TableCell>
                        <TableCell align="center">Tổng tiền</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {billSumList && billSumList.length === 0 ?
                        <TableRow>
                          <TableCell align="center" colSpan={7}>Không có đơn nào trong khoảng thời gian này</TableCell>
                        </TableRow> : <>
                          {billSumList.map((item, index) => {
                            return (
                              <TableRow key={index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                              >
                                <TableCell align="center"  >{index + 1}</TableCell>
                                <TableCell align="left"  >{item.account}</TableCell>
                                <TableCell align="center"  >{item.total}</TableCell>
                                <TableCell align="center"  >{item.price && formatCurrency(item.price)}</TableCell>
                              </TableRow>
                            );
                          })}
                        </>
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Layout>
  );
}
