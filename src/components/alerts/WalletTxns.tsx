"use client";

import { getWallets } from "@/actions/getWallets";
import { useCurrentUser } from "@/hooks/current-user";
import { useEffect, useRef, useState } from "react";
import {
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { markWallet } from "@/actions/markWallet";
import { helperToast } from "@/lib/helperToast";

const WalletTxns: React.FC = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const userRef: any = useRef(user);

  const [wallets, setWallets] = useState([
    {
      wId: "",
      uId: "",
      alertsEnabled: false,
    },
  ] as any);

  useEffect(() => {
    const fetchWallets = async () => {
      const data = await getWallets(userRef);
      if (data === null) {
        //logout user
        helperToast.error("User not found, please login again");
        router.push("/auth/signin");
      }
      // Ensure alertsEnabled is always defined
      const wallets = data.map((wallet: any) => ({
        ...wallet,
        alertsEnabled: wallet.alertsEnabled || false,
      }));
      setWallets(wallets);
      console.log("wallets data has arrived", wallets);
    };
    fetchWallets();
  }, []);

  const toggleWalletAlert = async (wId: string, newState: boolean) => {
    console.log("toggleWalletAlert", wId);
    const result: any = await markWallet(wId, newState, userRef.current);
    if (result.error) {
      helperToast.error(result.error);
      return;
    }

    // Find the updated wallet in the result array
    const updatedWallet = result.find((wallet: any) => wallet.wId === wId);
    if (!updatedWallet) {
      console.error("Updated wallet not found in result");
      return;
    }

    // Find the index of the wallet in the wallets array
    const index = wallets.findIndex((wallet: any) => wallet.wId === wId);
    if (index === -1) {
      console.error("Wallet not found in state");
      return;
    }

    // Replace the wallet in the wallets array with the updated wallet
    const updatedWallets = [...wallets];
    updatedWallets[index] = updatedWallet;

    setWallets(updatedWallets);
  };

  const formatWalletId = (walletId: string) => {
    console.log("wallets @ 60", wallets);
    console.log("walletId @ 61", walletId);
    const firstFive = walletId.substring(0, 5);
    const lastFive = walletId.substring(walletId.length - 5);
    return `${firstFive}...${lastFive}`;
  };

  return (
    <Container
      sx={{
        padding: "3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "75%",
      }}
    >
      <Typography variant="h4" component="h2" align="left" gutterBottom>
        Wallet Alerts
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#000000",
          boxShadow: "0px 0px 1px 0px #c5c2f1",
        }}
      >
        <Table
          aria-label="wallets table"
          sx={{
            backgroundColor: "#000000",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Wallet ID</TableCell>
              <TableCell align="right">Alerts Enabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wallets.map((wallet: any) => (
              <TableRow key={wallet.wId}>
                <TableCell component="th" scope="row">
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{
                      color: "inherit",
                      fontSize: "1.2rem",
                    }}
                  >
                    {formatWalletId(wallet.wId)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={wallet.alertsEnabled}
                        onChange={(event) =>
                          toggleWalletAlert(wallet.wId, event.target.checked)
                        }
                        inputProps={{ "aria-label": "alerts enabled" }}
                      />
                    }
                    label={wallet.alertsEnabled ? "On" : "Off"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default WalletTxns;
