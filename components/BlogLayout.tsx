import React, { ReactNode } from "react"

type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => (
  <>
    <div className="layout">
      {props.children}
    </div>
  </>
)

export default Layout