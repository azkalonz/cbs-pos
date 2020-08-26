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
import React, { useState, useRef, useCallback } from "react";

function SearchInput(props) {
  return <TextField type="text" variant="outlined" {...props} />;
}
export function SearchProduct(props) {
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [isFocused, setFocused] = useState(false);
  const resetSearch = useCallback(() => {
    setSearch("");
    setFocused(false);
    let input = searchRef?.current?.querySelector("input");
    if (input) input.value = "";
  }, [searchRef, search]);
  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    if (props.onChange) props.onChange(e.target.value);
  };
  return (
    <Box position="relative">
      <Box position="relative">
        <TextField
          ref={searchRef}
          type="text"
          variant="outlined"
          {...props}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => !search.length && setFocused(false)}
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
        <Box position="absolute" width="150%" bgcolor="#fff" component={Paper}>
          <Box p={1}>
            <Typography className="title">Results</Typography>
          </Box>
          <Divider />
          <List>
            {new Array(4).fill(1).map((a, i) => (
              <ListItem button key={i}>
                <ListItemText
                  primary="Home"
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
        style={{ background: "transparent" }}
      />
    </Box>
  );
}

export default SearchInput;
