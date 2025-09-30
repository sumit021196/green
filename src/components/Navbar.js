import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [investorOpen, setInvestorOpen] = useState(false);
  const [cocOpen, setCocOpen] = useState(false);
  const [statutoryOpen, setStatutoryOpen] = useState(false);
  const [shareholdersOpen, setShareholdersOpen] = useState(false);
  const [investorAnchorEl, setInvestorAnchorEl] = useState(null);

  const toggleDrawer = (open) => () => setMobileOpen(open);
  const openInvestorMenu = (event) => setInvestorAnchorEl(event.currentTarget);
  const closeInvestorMenu = () => setInvestorAnchorEl(null);

  const drawer = (
    <Box sx={{ width: 300 }} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItemButton component={Link} to="/" onClick={toggleDrawer(false)}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/about" onClick={toggleDrawer(false)}>
          <ListItemText primary="About" />
        </ListItemButton>

        {/* Investor Relation */}
        <ListItemButton onClick={() => setInvestorOpen((o) => !o)}>
          <ListItemText primary="Investor Relation" />
          {investorOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={investorOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/investor" onClick={toggleDrawer(false)}>
              <ListItemText primary="Financial Results" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/investor/shareholding" onClick={toggleDrawer(false)}>
              <ListItemText primary="Shareholding Pattern" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/investor/disclosure" onClick={toggleDrawer(false)}>
              <ListItemText primary="Stock Exchange Disclosure" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/investor/grievance" onClick={toggleDrawer(false)}>
              <ListItemText primary="Investor Grievance" />
            </ListItemButton>

            {/* Code Of Conduct */}
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCocOpen((o) => !o)}>
              <ListItemText primary="Code Of Conduct" />
              {cocOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={cocOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/code-of-conduct/sebi-lodr" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Regulation 7 (5) SEBI (LODR) Regulations,2015" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/code-of-conduct/insider-trading" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Insider trading code" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Statutory Document */}
            <ListItemButton sx={{ pl: 4 }} onClick={() => setStatutoryOpen((o) => !o)}>
              <ListItemText primary="Statutory Document" />
              {statutoryOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={statutoryOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/statutory-document/annual-reports" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Annual Reports" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/statutory-document/offer-documents" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Offer Documents" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Shareholder's Help Desk */}
            <ListItemButton sx={{ pl: 4 }} onClick={() => setShareholdersOpen((o) => !o)}>
              <ListItemText primary="Shareholder's Help Desk" />
              {shareholdersOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={shareholdersOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/postal-ballot" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Postal Ballot" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/agm-egm-notice" onClick={toggleDrawer(false)}>
                  <ListItemText primary="AGM / EGM Notice" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/book-closure" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Book Closure Notice" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/nomination-form" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Nomination Form" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/scrutinizers-reports" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Scrutinizer's Reports" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/unclaimed-dividend" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Unclaimed Dividend" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/dividend-history" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Dividend History" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/investor-presentations" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Investor Presentations" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/familiarization-programme" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Familiarization Programme For Ujaas" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/investor-relations" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Investor Relations" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/independent-director" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Terms and Conditions for the Appointment of Independent Director" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }} component={Link} to="/investor/shareholders-help-desk/annual-return" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Annual Return" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>

        <Divider sx={{ my: 1 }} />
        <ListItemButton component={Link} to="/policies" onClick={toggleDrawer(false)}>
          <ListItemText primary="Policies" />
        </ListItemButton>
        <ListItemButton component={Link} to="/investor/corporate-governance" onClick={toggleDrawer(false)}>
          <ListItemText primary="Corporate Governance" />
        </ListItemButton>
        <ListItemButton component={Link} to="/contact" onClick={toggleDrawer(false)}>
          <ListItemText primary="Contact" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component={Link} to="/" color="primary" sx={{ textDecoration: 'none', fontWeight: 600 }}>
            Globlegreen
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button component={NavLink} to="/" color="inherit" sx={{
              '&.active': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main' }
            }}>Home</Button>
            <Button component={NavLink} to="/about" color="inherit" sx={{
              '&.active': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main' }
            }}>About</Button>
            <Button color="inherit" onClick={openInvestorMenu}>Investor Relation</Button>
            <Menu anchorEl={investorAnchorEl} open={Boolean(investorAnchorEl)} onClose={closeInvestorMenu}>
              <MenuItem component={NavLink} to="/investor" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Financial Results</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholding" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Shareholding Pattern</MenuItem>
              <MenuItem component={NavLink} to="/investor/disclosure" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Stock Exchange Disclosure</MenuItem>
              <MenuItem component={NavLink} to="/investor/grievance" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Investor Grievance</MenuItem>
              <Divider />
              <MenuItem disabled>Code Of Conduct</MenuItem>
              <MenuItem component={Link} to="/investor/code-of-conduct/sebi-lodr" onClick={closeInvestorMenu}>Regulation 7 (5) SEBI (LODR) Regulations,2015</MenuItem>
              <MenuItem component={Link} to="/investor/code-of-conduct/insider-trading" onClick={closeInvestorMenu}>Insider trading code</MenuItem>
              <Divider />
              <MenuItem disabled>Statutory Document</MenuItem>
              <MenuItem component={NavLink} to="/investor/statutory-document/annual-reports" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Annual Reports</MenuItem>
              <MenuItem component={NavLink} to="/investor/statutory-document/offer-documents" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Offer Documents</MenuItem>
              <Divider />
              <MenuItem disabled>Shareholder's Help Desk</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/postal-ballot" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Postal Ballot</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/agm-egm-notice" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>AGM / EGM Notice</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/book-closure" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Book Closure Notice</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/nomination-form" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Nomination Form</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/scrutinizers-reports" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Scrutinizer's Reports</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/unclaimed-dividend" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Unclaimed Dividend</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/dividend-history" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Dividend History</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/investor-presentations" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Investor Presentations</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/familiarization-programme" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Familiarization Programme For Ujaas</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/investor-relations" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Investor Relations</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/independent-director" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Terms and Conditions for the Appointment of Independent Director</MenuItem>
              <MenuItem component={NavLink} to="/investor/shareholders-help-desk/annual-return" onClick={closeInvestorMenu} sx={{ '&.active': { color: 'primary.main' }}}>Annual Return</MenuItem>
            </Menu>
            <Button component={NavLink} to="/policies" color="inherit" sx={{
              '&.active': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main' }
            }}>Policies</Button>
            <Button component={NavLink} to="/investor/corporate-governance" color="inherit" sx={{
              '&.active': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main' }
            }}>Corporate Governance</Button>
            <Button component={NavLink} to="/contact" color="inherit" sx={{
              '&.active': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main' }
            }}>Contact</Button>
          </Box>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ ml: 1, display: { md: 'none' } }}
            onClick={toggleDrawer(true)}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar; 