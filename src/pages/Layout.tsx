import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Home from './Home';
import MovieList from './movie/MovieList';
import AddMovie from './movie/AddMovie';
import EditMovie from './movie/EditMovie';
import { Layout } from 'antd';
import { Menu } from 'antd';
const { Header, Sider, Content } = Layout;

const _Layout: React.FC = function () {
  return (
    <div className="container">
      <Layout>
        <Header className="header">
          <NavLink to="/">电影后台管理系统</NavLink>
        </Header>

        <Layout>
          <Sider>
            <Menu mode="inline" theme="dark">
              <Menu.Item key="1">
                <NavLink to="/movie">电影列表</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/movie/add">添加电影</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>

          <Content>
            <div className="main">
              <Route path="/" exact component={Home} />
              <Route path="/movie" exact component={MovieList} />
              <Route path="/movie/add" exact component={AddMovie} />
              <Route path="/movie/edit/:id" exact component={EditMovie} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default _Layout;
