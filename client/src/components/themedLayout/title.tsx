import React from "react";
import { useRouterContext, useLink, useRouterType } from "@refinedev/core";
import MuiLink from "@mui/material/Link";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import type { RefineLayoutThemedTitleProps } from "@refinedev/mui";

//import { logo, yariga } from '../../assets';

const defaultText = "Real Estate";

const defaultIcon = (
  <svg id="ejqnkucPr2w1" xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 300 300" 
    shapeRendering="geometricPrecision" 
    textRendering="geometricPrecision"
  >
    <path d="M0.047638,41.4022v-31.678201L5.132327,7.859613l.084742-8.050762l7.270811.033749v5.847394l7.647354-4.9152L35.135067,9.673001l-.084744,28.974298h-21.948915l-.000007-18.580602h12.033774l-.084745,12.39423" 
      transform="matrix(7.085459 0 0 6.510751 24.875991 25.623349)" 
      fill="none" stroke="currentColor" strokeWidth="5"/>
  </svg>

);

/* const defaultIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="refine-logo"
  >
    <path
      d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V6Z"
      fill="currentColor"
    />
  </svg>
); */

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
  icon = defaultIcon,
  text = defaultText,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;
 //console.log(wrapperStyles);
  return (
    <MuiLink
      to="/"
      component={ActiveLink}
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        columnGap: "23px",
        ...wrapperStyles,
      }}
    >
      <SvgIcon  color="primary"
        sx={{
          height: '40px',
          width: '40px'
        }}>
        {icon}
      </SvgIcon>
      
      
      {!collapsed ? (<Typography fontSize={18} fontWeight={600} color="#000">{text}</Typography>) : ''} 
      
    </MuiLink>
  );
};
