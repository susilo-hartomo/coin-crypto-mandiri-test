import { forwardRef, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const dummData = [
	{
		id: 'btc-bitcoin',
		name: 'Bitcoin',
		symbol: 'BTC',
		rank: 1,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'eth-ethereum',
		name: 'Ethereum',
		symbol: 'ETH',
		rank: 2,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'usdt-tether',
		name: 'Tether',
		symbol: 'USDT',
		rank: 3,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'bnb-binance-coin',
		name: 'Binance Coin',
		symbol: 'BNB',
		rank: 4,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'usdc-usd-coin',
		name: 'USD Coin',
		symbol: 'USDC',
		rank: 5,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'hex-hex',
		name: 'HEX',
		symbol: 'HEX',
		rank: 6,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'sol-solana',
		name: 'Solana',
		symbol: 'SOL',
		rank: 7,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'xrp-xrp',
		name: 'XRP',
		symbol: 'XRP',
		rank: 8,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'luna-terra',
		name: 'Terra',
		symbol: 'LUNA',
		rank: 9,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'ada-cardano',
		name: 'Cardano',
		symbol: 'ADA',
		rank: 10,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'avax-avalanche',
		name: 'Avalanche',
		symbol: 'AVAX',
		rank: 11,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'ust-terrausd',
		name: 'TerraUSD',
		symbol: 'UST',
		rank: 12,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'busd-binance-usd',
		name: 'Binance USD',
		symbol: 'BUSD',
		rank: 13,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'doge-dogecoin',
		name: 'Dogecoin',
		symbol: 'DOGE',
		rank: 14,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'dot-polkadot',
		name: 'Polkadot',
		symbol: 'DOT',
		rank: 15,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'shib-shiba-inu',
		name: 'Shiba Inu',
		symbol: 'SHIB',
		rank: 16,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'wbtc-wrapped-bitcoin',
		name: 'Wrapped Bitcoin',
		symbol: 'WBTC',
		rank: 17,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'matic-polygon',
		name: 'Polygon',
		symbol: 'MATIC',
		rank: 18,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'steth-lido-staked-ether',
		name: 'Lido Staked Ether',
		symbol: 'STETH',
		rank: 19,
		is_new: false,
		is_active: true,
		type: 'token',
	},
	{
		id: 'near-near-protocol',
		name: 'Near Protocol',
		symbol: 'NEAR',
		rank: 20,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'ltc-litecoin',
		name: 'Litecoin',
		symbol: 'LTC',
		rank: 21,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
];

export default function Home() {
	const [value, setValue] = useState('1');
	const [page, setPage] = useState(1);
	const [coints, setCoints] = useState([]);
	const [symbol, setSymbol] = useState('');
	const [name, setName] = useState('');
	const [modalDetail, setModalDetail] = useState(false);
	const [detailCoin, setDetailCoin] = useState('');

	useEffect(() => {
		const cointsData = getCoints();
		// kena cors
		setCoints(dummData.slice((page - 1) * 10, page * 10));
	}, [page]);

	async function getCoints() {
		try {
			const response = await axios.get('https://api.coinpaprika.com/v1/coins/');
			return response;
		} catch (error) {
			console.error(error);
		}
	}

	const handleFilterCoint = () => {
		const filterCoint = dummData.filter((e) => e.symbol == symbol || e.name.toLowerCase() == name.toLowerCase());
		setCoints(filterCoint);
	};

	const setDataDetail = (coint) => {
		setModalDetail(true);
		setDetailCoin(coint);
	};

	const handleDelete = async (coinId) => {
		try {
			alert('Url nya lupa, delete coin with name ' + coinId);
			const response = await axios.delete('https://api.coinpaprika.com/v1/coins/' + coinId);
			return response;
		} catch (error) {
			console.error(error);
		}
	};

	const Transition = forwardRef(function Transition(props, ref) {
		return <Slide direction='up' ref={ref} {...props} />;
	});

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<Box sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<TabList
								onChange={(event, selected) => setValue(selected)}
								aria-label='lab API tabs example'>
								<Tab label='Home' value='1' />
								<Tab label='Coint lIst' value='2' />
							</TabList>
						</Box>

						{/* home tab */}
						<TabPanel value='1'>Home</TabPanel>

						{/* coint page */}
						<TabPanel value='2'>
							{/* title tab */}
							<Typography variant='caption' sx={{ fontSize: 12, fontWeight: '300', marginBottom: 2 }}>
								Coints List
							</Typography>

							{/* card table */}
							<Card sx={{ minWidth: 275, padding: 4, marginTop: 2 }}>
								{/* title */}
								<Typography sx={{ color: 'info' }}>Coints List</Typography>

								{/* form input */}
								<Grid container spacing={2} sx={{ marginTop: 1 }}>
									<Grid item xs={2}>
										<FormControl fullWidth>
											<InputLabel id='demo-simple-select-label'>Coint</InputLabel>
											<Select
												labelId='demo-simple-select-label'
												id='demo-simple-select'
												value={symbol}
												label='Select'
												onChange={(event) => setSymbol(event.target.value)}>
												{dummData.map((option) => (
													<MenuItem key={option.symbol} value={option.symbol}>
														{option.symbol}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={2}>
										<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
											<Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
											<TextField
												label='search coint'
												color='primary'
												onChange={(event) => setName(event.target.value)}
											/>
										</Box>
									</Grid>
									<Grid item xs={2}>
										<Button size='large' variant='contained' onClick={() => handleFilterCoint()}>
											Search
										</Button>
									</Grid>
								</Grid>

								<CardContent>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 650 }} aria-label='simple table'>
											<TableHead>
												<TableRow>
													<TableCell>Id</TableCell>
													<TableCell align='right'>Name</TableCell>
													<TableCell align='right'>Symbol</TableCell>
													<TableCell align='right'>Rank</TableCell>
													<TableCell align='right'>Type</TableCell>
													<TableCell align='right'>Active</TableCell>
													<TableCell align='right'>Action</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{coints.map((row) => (
													<TableRow
														key={row?.id}
														sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
														<TableCell
															onClick={() => setDataDetail(row)}
															style={{ cursor: 'pointer' }}>
															{row.id}
														</TableCell>
														<TableCell
															onClick={() => setDataDetail(row)}
															style={{ cursor: 'pointer' }}
															align='right'>
															{row.name}
														</TableCell>
														<TableCell
															onClick={() => setDataDetail(row)}
															style={{ cursor: 'pointer' }}
															align='right'>
															{row.symbol}
														</TableCell>
														<TableCell
															onClick={() => setDataDetail(row)}
															style={{ cursor: 'pointer' }}
															align='right'>
															{row.rank}
														</TableCell>
														<TableCell
															onClick={() => setDataDetail(row)}
															style={{ cursor: 'pointer' }}
															align='right'>
															{row.type}
														</TableCell>
														<TableCell
															onClick={() => setDataDetail(row)}
															align='right'>{`${row.is_active}`}</TableCell>
														<TableCell align='right'>
															<Button
																style={{ backgroundColor: red[500], color: 'white' }}
																variant='contained'
																onClick={() => handleDelete(row.name)}>
																Delete
															</Button>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</CardContent>
								<Grid container spacing={2}>
									<Grid item xs={8}></Grid>
									<Grid item xs={4}>
										<Pagination
											count={Math.ceil(dummData.length / 10)}
											variant='outlined'
											shape='rounded'
											onChange={(event, page) => {
												setPage(page);
											}}
										/>
									</Grid>
								</Grid>
							</Card>
						</TabPanel>
					</TabContext>
				</Box>
			</main>

			<Dialog
				open={modalDetail}
				keepMounted
				onClose={() => setModalDetail(false)}
				style={{ minWidth: 550 }}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>Detail coin info</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<Typography style={{ width: 400, display: 'flex' }}>
							<div style={{ minWidth: 200 }}> ID </div> {detailCoin.id}
						</Typography>
						<Typography style={{ width: 400, display: 'flex' }}>
							<div style={{ minWidth: 200 }}> Name</div> {detailCoin.name}
						</Typography>
						<Typography style={{ width: 400, display: 'flex' }}>
							<div style={{ minWidth: 200 }}> Symbol</div> {detailCoin.symbol}
						</Typography>
						<Typography style={{ width: 400, display: 'flex' }}>
							<div style={{ minWidth: 200 }}> Type</div> {detailCoin.type}
						</Typography>
						<Typography style={{ width: 400, display: 'flex' }}>
							<div style={{ minWidth: 200 }}> Active</div> {`${detailCoin.is_active}`}
						</Typography>
						<Typography style={{ width: 400, display: 'flex' }}>
							<div style={{ minWidth: 200 }}> Is New?</div> {`${detailCoin?.is_new}`}
						</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setModalDetail(false)}>Close</Button>
				</DialogActions>
			</Dialog>

			<footer className={styles.footer}>Nama : Susilo Hartomo (susilo.hartomo@sci.ui.ac.id)</footer>
		</div>
	);
}
