import { User } from 'src/user/user.mongo.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { NamingStrategy } from './naming.strategies';
// import { Page } from '@/page/page.mongo.entity';
// import { PageConfig } from '@/page/page-config/page-config.mongo.entity';

// 设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mongodb';
import { getConfig } from 'utils/index';

const path = require('path');
const { MONGODB_CONFIG } = getConfig();

// console.log(
//   'dirname=====',
//   __dirname,
//   path.join(__dirname, `../../**/*.${MONGODB_CONFIG.entities}.entity{.ts,.js}`),
// );
const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  NamedNodeMap: new NamingStrategy(),
  type: databaseType,
  entities: [
    path.join(
      __dirname,
      `../../**/*.${MONGODB_CONFIG.entities}.entity{.ts,.js}`,
    ),
    // User,
  ],
};

const MONGODB_CONNECTION = new DataSource(MONGODB_DATABASE_CONFIG);
// console.log('MONGODB_CONNECTION======>', MONGODB_CONNECTION);
// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_CONNECTION',
    useFactory: async () => {
      await MONGODB_CONNECTION.initialize();
      return MONGODB_CONNECTION;
    },
  },
];
