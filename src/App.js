import { Box, Input, Stack, Typography } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [coin, setCoin] = useState([]);

  const fetchCoin = async () => {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    // console.log(data);
    setCoin(data);
  };

  const filteredCoins = coin.filter((coin) =>
    coin.name.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <Stack bgcolor="black" minHeight="100vh" alignItems="center">
      <Box>
        <Input
          sx={{
            bgcolor: " rgb(27,186,213)",
            background:
              "linear-gradient(90deg, rgba(27,186,213,1) 0%, rgba(94,94,186,1) 52%, rgba(42,175,194,1) 100%)",
            p: "10px 20px",
            color: "#48494a",
            borderRadius: "10px",
            mt: { xs: "8vw", md: "4vw" },
            width: "40vw",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            mb: "4vw",
          }}
          type="text"
          value={input}
          placeholder="provide a coin name..."
          onChange={(e) => setInput(e.target.value)}
        />
      </Box>

      <Box>
        {filteredCoins.map((coin) => (
          <Stack
            key={coin.id}
            direction="row"
            minWidth="70vw"
            p="10px"
            justifyContent="space-between"
            alignItems="center"
            color="white"
            borderBottom="1px solid grey"
          >
            <Box
              fontSize="20px"
              fontWeight="800"
              p="5px"
              display="flex"
              gap="10px"
              width="250px"
            >
              <img src={coin.image} style={{ width: "20px" }} />
              {coin.name}
            </Box>
            <Box width="150px" fontWeight="600">
              Rs{coin.current_price}
            </Box>
            <Box width="150px" fontWeight="600">
              {coin.ath_change_percentage > 0 ? (
                <Box color="green">
                  {coin.ath_change_percentage.toFixed(2)}%
                </Box>
              ) : (
                <Box color="red">{coin.ath_change_percentage.toFixed(2)}%</Box>
              )}
            </Box>
            <Stack width="150px" fontWeight="600">
              <Typography fontWeight="600">Mkt Cap</Typography>
              {coin.market_cap.toLocaleString()}
            </Stack>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
}

export default App;
