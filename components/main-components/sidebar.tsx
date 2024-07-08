"use client";
import React, { useState, ReactNode } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Header from "./header";
import Link from "next/link";
const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
interface SideBarProps {
  children?: ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <nav className="flex justify-start m-5" >
          <ul className="pt-5">
            <li className="mb-4">
              <Link
                href="/connect/chat"
                className="text-white flex items-center space-x-2"
              >
                <span>Chat</span>
              </Link>
            </li>
            <li className="mb-4 ">
              <Link
                href="/connect/group"
                className="text-white flex items-center space-x-2"
              >
                <span>Group</span>
              </Link>
            </li>
            <li className="mb-4">
              <a
                href="/connect/friends"
                className="text-white flex items-center space-x-2"
              >
                <span>Friends</span>
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/connect/AddNew"
                className="text-white flex items-center space-x-2"
              >
                <span>Add New Friends</span>
              </a>
            </li>
          </ul>
        </nav>
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SideBar;
