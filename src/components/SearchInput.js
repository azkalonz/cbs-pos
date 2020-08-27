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
} from "@material-ui/core";
import React, { useState, useRef, useCallback, useMemo } from "react";

function SearchInput(props) {
  return <TextField type="text" variant="outlined" {...props} />;
}
export function SearchProduct(props) {
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [isFocused, setFocused] = useState(false);
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
  return (
    <Box
      position="relative"
      style={props.style}
      display="flex"
      justifyContent="center"
    >
      <Box position="relative" display="flex" justifyContent="center">
        <TextField
          ref={searchRef}
          type="text"
          variant="outlined"
          {...props}
          fullWidth
          onChange={handleChange}
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
      <Slide in={!!search.length}>
        <Box
          position="absolute"
          width="150%"
          bgcolor="#fff"
          component={Paper}
          top={50}
        >
          <Box p={1}>
            <Typography className="title">Results</Typography>
          </Box>
          <Divider />
          <List>
            {new Array(4).fill(1).map((a, i) => (
              <ListItem button key={i}>
                <ListItemText
                  primary="Product Name"
                  primaryTypographyProps={{ style: { color: "#222" } }}
                />
              </ListItem>
            ))}
          </List>
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
