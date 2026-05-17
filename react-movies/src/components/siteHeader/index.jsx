import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [moviesOpen, setMoviesOpen] = useState(false);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Discover Movies", path: "/" },
    { label: "Popular People", path: "/people/popular" },
    { label: "Top Rated Series", path: "/tv/top-rated" },
  ];

  const movieOptions = [
    { label: "Discover Movies", path: "/" },
    { label: "Upcoming", path: "/movies/upcomingMovies" },
    { label: "Top Rated Movies", path: "/movies/toprated" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    setMoviesOpen(false);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoviesEnter = () => {
    setMoviesOpen(true);
  };

  const handleMoviesLeave = () => {
    setMoviesOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar
          sx={{
            minHeight: 72,
            px: { xs: 2, md: 4 },
            gap: 2,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              TMDB Client
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Movies and series in one place
            </Typography>
          </Box>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ border: "1px solid #e7c2cf", backgroundColor: "#ffffff" }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                <Box
                  onMouseEnter={handleMoviesEnter}
                  onMouseLeave={handleMoviesLeave}
                  sx={{ position: "relative", 
                   }}
                >
                  <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    sx={{
                      border: "1px solid #e7c2cf",
                      px: 2,
                      py: 1.2,
                      backgroundColor: "#ffffff",
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                  >
                    <MenuIcon fontSize="small" />
                    <Typography variant="body1">Movies</Typography>
                  </Stack>
                  {moviesOpen ? (
                    <Paper
                      sx={{
                        position: "absolute",
                        top: "calc(100%)",
                        left: 0,
                        minWidth: 220,
                        border: "1px solid #e7c2cf",
                        zIndex: 20,
                        overflow: "hidden",
                      }}
                    >
                      {movieOptions.map((opt) => (
                        <Box
                          key={opt.label}
                          onClick={() => handleMenuSelect(opt.path)}
                          sx={{
                            px: 2,
                            py: 1.25,
                            cursor: "pointer",
                            borderBottom: "1px solid #f3d6df",
                            "&:last-child": {
                              borderBottom: "none",
                            },
                            "&:hover": {
    
                              backgroundColor: "#fff7fa",
                            },
                          }}
                        >
                          <Typography variant="body2">{opt.label}</Typography>
                        </Box>
                      ))}
                    </Paper>
                  ) : null}
                </Box>
                {[
                  { label: "People", path: "/people/popular" },
                  { label: "TV Shows", path: "/tv/top-rated" },
                  { label: "Favorites", path: "/movies/favorites" },
                ].map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{
                      border: "1px solid #e7c2cf",
                      px: 2,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
