import React from "react";
import Center from "components/center";

const Centered = ({children, size}) => {
  return(
    <Center size={size}>
      <div style={{display: "flex", alignItems: "center", height: "100vh"}}>
          <div>
            {children}
        </div>
      </div>
    </Center>
  )
}

export default Centered;
