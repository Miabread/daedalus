'use client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AppBar, CssBaseline, Toolbar, Typography, Link } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import NextLink from 'next/link';
import { forwardRef } from 'react';

const LinkBehavior = forwardRef(function LinkBehaviour(props, ref) {
    //@ts-ignore
    return <NextLink ref={ref} {...props} />;
});

const theme = createTheme({
    components: {
        MuiLink: {
            defaultProps: {
                //@ts-ignore
                component: LinkBehavior,
            },
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
    },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar position="sticky">
                        <Toolbar>
                            <Link href="/" variant="h6" color="inherit" underline="none">
                                Daedalus
                            </Link>
                        </Toolbar>
                    </AppBar>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
