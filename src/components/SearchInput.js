import {
  TextField,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Backdrop,
  Slide,
  IconButton,
  Icon,
  CircularProgress,
} from "@material-ui/core";
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import fetchData from "../utils/fetch";
import Api from "../utils/api";
import Scrollbar from "../components/Scrollbar";
import Loader from "./Loader";
import { Product } from "../utils/products";

function SearchInput(props) {
  return <TextField type="text" variant="outlined" {...props} />;
}
export function SearchProduct(props) {
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [isFocused, setFocused] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const input = useMemo(() => searchRef?.current?.querySelector("input"), [
    searchRef,
    search,
  ]);
  const resetSearch = useCallback(() => {
    setSearch("");
    setFocused(false);
    if (input) input.value = "";
  }, [searchRef, search]);
  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    if (props.onChange) props.onChange(e.target.value);
  };
  const onFocus = () => {
    setFocused(true);
  };
  const searchProduct = async (query) => {
    fetchData({
      before: () => setLoading(true),
      send: async () =>
        await Api.get("/products?search=" + query, {
          cancelToken: (cancel) => {
            window.cancelToken = cancel;
          },
        }),
      after: (data) => {
        setLoading(false);
        setResult(
          Product.ignore(
            data?.map((q) => ({
              ...q,
              product_name: q.product_name?.replace("&quot;", '"'),
            })) || []
          )
        );
        console.log(data);
        window.cancelToken = null;
      },
    });
  };
  const handleSearch = useCallback(
    (query) => {
      if (query) {
        setLoading(true);
        if (window.cancelToken) window.cancelToken();
        window.clearTimeout(window.searching);
        window.searching = setTimeout(() => {
          searchProduct(query);
        }, 500);
      }
    },
    [loading, searchProduct]
  );
  const onExit = () => {
    window.clearTimeout(window.searching);
    if (window.cancelToken) {
      window.cancelToken();
      window.cancelToken = null;
    }
    setResult([]);
  };
  const productDetails = useCallback((product) => {
    props.history.push("/products/" + product.product_id);
    resetSearch();
  }, []);
  return (
    <Box
      position="relative"
      style={{ ...(props.style || {}), zIndex: 11 }}
      display="flex"
      className={props.fullWidth && isFocused ? "full-width-search" : ""}
      justifyContent={props.align || "center"}
    >
      <Box
        position="relative"
        display="flex"
        justifyContent={props.align || "center"}
      >
        <TextField
          ref={searchRef}
          type="text"
          variant="outlined"
          {...props}
          fullWidth
          onChange={(e) => {
            handleChange(e);
            handleSearch(e.target.value);
          }}
          onFocus={() => onFocus()}
          onBlur={() => !search.length && setFocused(false)}
          inputProps={{
            style: {
              height: 32,
            },
          }}
          style={{
            height: 32,
            background: "#fff",
            maxWidth: !isFocused ? "70%" : "100%",
          }}
        />
        {isFocused && !!search.length && (
          <IconButton
            onClick={resetSearch}
            style={{ position: "absolute", right: 0, top: 0, height: "100%" }}
          >
            <Icon>close</Icon>
          </IconButton>
        )}
      </Box>
      <Slide in={!!search.length} onExited={() => onExit()}>
        <Box
          position="absolute"
          width={!props.fullWidth ? "150%" : "100%"}
          bgcolor="#fff"
          component={Paper}
          top={50}
        >
          {!loading && (
            <React.Fragment>
              <Box p={1}>
                <Typography className="title">Results</Typography>
              </Box>
              <Divider />
              {!!result?.length && (
                <Box maxHeight="70vh" overflow="auto">
                  {result.map((product, i) => {
                    if (!product) return null;
                    const { product_name } = product;
                    return (
                      <ListItem
                        button
                        key={i}
                        onClick={() => {
                          if (!props.onClick) {
                            productDetails(product);
                          } else if (product) {
                            props.onClick(product, resetSearch);
                          }
                        }}
                      >
                        <ListItemText
                          primary={product_name}
                          primaryTypographyProps={{
                            style: { color: "#222" },
                          }}
                        />
                      </ListItem>
                    );
                  })}
                </Box>
              )}
              {!result?.length && (
                <Box p={3} textAlign="center">
                  <Typography className="title2">Nothing found</Typography>
                </Box>
              )}
            </React.Fragment>
          )}
          {loading && (
            <Box
              overflow="hidden"
              style={{ userSelect: "none", pointerEvents: "none" }}
            >
              <Box p={3}>
                <Loader label="Searching..." />
              </Box>
            </Box>
          )}
        </Box>
      </Slide>
      <Backdrop
        onClick={resetSearch}
        open={!!search.length}
        style={{ background: "rgba(0,0,0,0.2)" }}
      />
    </Box>
  );
}

export default SearchInput;
