import React, { Component } from 'react';
import { IMovieState } from '../redux/reducers/MovieReducer';
import { Table, Switch, Button, message, Popconfirm, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { Imovie } from '../services/MovieService';
import img from '../assets/1.jpg';
import { NavLink } from 'react-router-dom';
import { PaginationConfig } from 'antd/lib/pagination';

export interface IMovieTableEvents {
  // 完成加载之后的事件
  onLoad: () => void;
  onSwitchChange: (
    type: 'isHot' | 'isComing' | 'isClassic',
    newState: boolean,
    id: string
  ) => void;
  onDelete: (id: string) => Promise<void>;
  onChange: (newPage: number) => void;
  onKeyChange: (key: string) => void;
  onSearch: () => void;
}

export default class MovieTable extends Component<
  IMovieState & IMovieTableEvents
> {
  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  private getFilterDropDown(p: object) {
    return (
      <div style={{ padding: 8 }}>
        <Input
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          value={this.props.condition.key}
          onChange={(e) => this.props.onKeyChange(e.target.value)}
          onPressEnter={this.props.onSearch}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
          onClick={this.props.onSearch}
        >
          搜索
        </Button>
        <Button
          size="small"
          style={{ width: 90 }}
          onClick={() => {
            this.props.onKeyChange('');
            this.props.onSearch();
          }}
        >
          重置
        </Button>
      </div>
    );
  }

  private getColumns(): ColumnsType<Imovie> {
    return [
      {
        title: '封面',
        dataIndex: 'poster',
        render: (poster) => {
          if (poster) {
            return <img className="tablePoster" src={poster} alt="电影海报" />;
          } else {
            return <img className="tablePoster" src={img} alt="电影海报" />;
          }
        },
      },
      {
        title: '名称',
        dataIndex: 'name',
        filterDropdown: this.getFilterDropDown.bind(this),
        filterIcon: <SearchOutlined />,
      },
      {
        title: '地区',
        dataIndex: 'areas',
        render: (text: string[]) => {
          return text.join(', ');
        },
      },
      {
        title: '类型',
        dataIndex: 'types',
        render: (text: string[]) => {
          return text.join(', ');
        },
      },
      {
        title: '时长',
        dataIndex: 'timeLong',
        render: (timeLong) => {
          return timeLong + '分钟';
        },
      },
      {
        title: '正在热映',
        dataIndex: 'isHot',
        render: (isHot, record) => {
          return (
            <Switch
              checked={isHot}
              onChange={(newVal) => {
                this.props.onSwitchChange('isHot', newVal, record._id!);
              }}
            />
          );
        },
      },
      {
        title: '即将上映',
        dataIndex: 'isComing',
        render: (isComing, record) => {
          return (
            <Switch
              checked={isComing}
              onChange={(newVal) => {
                this.props.onSwitchChange('isComing', newVal, record._id!);
              }}
            />
          );
        },
      },

      {
        title: '即将上映',
        dataIndex: 'isClassic',
        render: (isClassic, record) => {
          return (
            <Switch
              checked={isClassic}
              onChange={(newVal) => {
                this.props.onSwitchChange('isClassic', newVal, record._id!);
              }}
            />
          );
        },
      },

      {
        title: '操作',
        dataIndex: '_id',
        render: (id: string) => {
          return (
            <div>
              <NavLink to={'/movie/edit/' + id}>
                <Button type="primary" size="small">
                  编辑
                </Button>
              </NavLink>
              <Popconfirm
                title="确认删除吗"
                onConfirm={async () => {
                  await this.props.onDelete(id);
                  message.success('删除成功');
                }}
                okText="确认"
                cancelText="取消"
              >
                <Button type="danger" size="small">
                  删除
                </Button>
              </Popconfirm>
              ,
            </div>
          );
        },
      },
    ];
  }

  getPageConfig(): PaginationConfig | false {
    if (this.props.total === 0) {
      return false;
    }
    return {
      current: this.props.condition.page,
      pageSize: this.props.condition.limit,
      total: this.props.total,
    };
  }

  handleChange(pagination: any) {
    this.props.onChange(pagination.current);
  }

  render() {
    return (
      <Table
        rowKey="_id"
        dataSource={this.props.data}
        columns={this.getColumns()}
        pagination={this.getPageConfig()}
        onChange={this.handleChange.bind(this)}
        loading={this.props.isLoading}
      ></Table>
    );
  }
}
