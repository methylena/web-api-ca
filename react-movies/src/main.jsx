import SiteHeader from './components/siteHeader'
import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MoviesContextProvider from "./contexts/moviesContext";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage";
import ActorPage from "./pages/actorPage";
import PopularPeoplePage from "./pages/popularPeoplePage";
import TopRatedTVShowsPage from "./pages/topRatedTVShowsPage";
import TVShowPage from "./pages/tvShowDetailsPage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#d48aa0",
    },
    secondary: {
      main: "#6b7280",
    },
    background: {
      default: "#fdf1f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#4b5563",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#fdf1f5",
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#f8dfe7",
          color: "#111827",
          boxShadow: "none",
          borderBottom: "1px solid #e7c2cf",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          border: "1px solid #d1d5db",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthContextProvider>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/movies/toprated" element={<TopRatedMoviesPage />} />
                <Route path="/people/popular" element={<PopularPeoplePage />} />
                <Route path="/tv/top-rated" element={<TopRatedTVShowsPage />} />
                <Route path="/tv/:id" element={<TVShowPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/movies/:id/credits" element={<MoviePage />} />
                <Route path="/person/:id" element={<ActorPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                  <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};


const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
