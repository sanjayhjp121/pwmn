import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav, userRole }) {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname, onCloseNav, openNav]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{user?.full_name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {user?.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig(userRole).map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderUpgrade = (
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      {/* <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Get more?</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            From only $69
          </Typography>
        </Box>

        <Button
          href="#"
          target="_blank"
          variant="contained"
          color="inherit"
        >
          Upgrade to Pro
        </Button>
      </Stack> */}
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
      {renderUpgrade}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  userRole: PropTypes.string,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = item.path === pathname || (item.children && item.children.some(child => child.path === pathname));

  const handleClick = () => {
    setOpen(!open);
  };

  if (item.children) {
    return (
      <>
        <ListItemButton
          onClick={handleClick}
          sx={{
            minHeight: 44,
            borderRadius: 0.75,
            typography: 'body2',
            color: 'text.secondary',
            textTransform: 'capitalize',
            fontWeight: 'fontWeightMedium',
            ...(active && {
              color: 'primary.main',
              fontWeight: 'fontWeightSemiBold',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
            }),
          }}
        >
          <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {item.icon}
          </Box>
          <Box component="span">{item.title}</Box>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <ListItemButton
                key={child.title}
                component={RouterLink}
                href={child.path}
                sx={{
                  pl: 4,
                  minHeight: 44,
                  borderRadius: 0.75,
                  typography: 'body2',
                  color: 'text.secondary',
                  textTransform: 'capitalize',
                  fontWeight: 'fontWeightMedium',
                  ...(child.path === pathname && {
                    color: 'primary.main',
                    fontWeight: 'fontWeightSemiBold',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                    },
                  }),
                }}
              >
                <Box component="span">{child.title}</Box>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
};