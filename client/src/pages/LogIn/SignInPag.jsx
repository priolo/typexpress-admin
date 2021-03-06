/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Avatar, Button, TextField, Typography, Container, CircularProgress } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../store/auth';
import { useLayout } from '../../store/layout';

import { useValidator, validateAll, rules } from '@priolo/iistore'


export function SignInPag() {

	const classes = useStyles()
	const { t } = useTranslation()
	const [eUsername, heUsername, hcUsername, rUsername] = useValidator([rules.obligatory])
	const [ePassword, hePassword, hcPassword, rPassword] = useValidator([rules.obligatory])
	const { state: auth, setUsername, setPassword, signin } = useAuth()
	const { state: layout } = useLayout()

	useEffect(() => {
		if (layout.focus == "password") rUsername.current.focus()
	}, [layout.focus])

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>

				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component="h1" variant="h5">
					{t("pag.signin.title")}
				</Typography>

				<TextField fullWidth autoFocus
					disabled={layout.busy}
					inputRef={rUsername}
					label={t("pag.signin.username")}
					variant="outlined"
					margin="normal"
					value={auth.username}
					onChange={e => setUsername(hcUsername(e))}
					error={heUsername()}
					helperText={eUsername}
				/>

				<TextField fullWidth
					disabled={layout.busy}
					inputRef={rPassword}
					label={t("pag.signin.password")}
					type="password"
					variant="outlined"
					margin="normal"
					value={auth.password}
					onChange={e => setPassword(hcPassword(e))}
					error={hePassword()}
					helperText={ePassword}
				/>

				{layout.busy == false ? (<>
					<Button fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={() => validateAll(() => signin())}
					>
						{t("pag.signin.btt_signin")}
					</Button>
				</>) : (
						<CircularProgress />
					)}

			</div>
		</Container>
	);
}


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));