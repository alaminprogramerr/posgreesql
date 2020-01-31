import { defaultFont } from "../../mainStyle.js";

import tooltip from "../tooltipsStyle.js";

const headerLinksStyle = theme => ({
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit"
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
        backgroundColor: "#e5e5e5"
      }
    }
  },
  // position: absolute;
	// right: 0%;
	// top: 35%;
	// display: inline-block;
	// width: 50%;
	// text-align: right;
	// font-size: 18px;
	// font-weight: bold;
  listItemText: {
    padding: "0 !important"
  },
  navLink: {
    color: "inherit",
    fontSize: "18px",
    fontweight: "bold",
    textTransform: "uppercase",
    textDecoration: "none",
    borderRadius: "0px",
    margin: "0px",
    marginBottom: "2%",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
      borderBottom: "5px solid #31a9b8",
      paddingBottom: "3px"
    },
    // [theme.breakpoints.down("sm")]: {
    //   width: "calc(100% - 30px)",
    //   marginLeft: "15px",
    //   marginBottom: "8px",
    //   marginTop: "8px",
    //   textAlign: "left",
    //   "& > span:first-child": {
    //     justifyContent: "flex-start"
    //   }
    // }
  },
  notificationNavLink: {
    color: "inherit",

    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    top: "4px"
  },
  registerNavLink: {
    top: "3px",
    position: "relative",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex"
  },
  navLinkActive: {
    color: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  icons: {
    width: "20px",
    height: "20px",
    marginRight: "3px"
  },
  socialIcons: {
    position: "relative",
    fontSize: "20px !important",
    marginRight: "4px"
  },
  dropdownLink: {
    "&,&:hover,&:focus": {
      color: "inherit",
      textDecoration: "none",
      display: "block",
      padding: "10px 20px"
    }
  },
  ...tooltip,
  marginRight5: {
    marginRight: "5px"
  }
});

export default headerLinksStyle;
