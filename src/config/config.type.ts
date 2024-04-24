export enum EEnvironment {
  Local = 'local',
  Staging = 'staging',
  Development = 'development',
  Production = 'production',
}

export type TAppConfig = {
  nodeEnv: string;
  port: number;
  apiPrefix: string;
};

export type TAuthConfig = {
  jwtSecret?: string;
  jwtAccessTokenExpiration?: string;
  jwtRefreshTokenExpiration?: string;
  cryptKey?: string;
};

export type TDatabaseConfig = {
  sqlUrl?: string;
  sqlType?: string;
  sqlHost?: string;
  sqlPort?: number;
  sqlPassword?: string;
  sqlName?: string;
  sqlUsername?: string;
  sqlSynchronize?: boolean;
  sqlMaxConnections?: number;
  sqlSslEnabled?: boolean;
  sqlRejectUnauthorized?: boolean;
  sqlCa?: string;
  key?: string;
  cert?: string;
  sqlLogging?: ESqlLogging;
};

export type TAllConfigType = {
  app: TAppConfig;
  auth: TAuthConfig;
  database: TDatabaseConfig;
};

export enum ESqlLogging {
  QUERY = 'query', // Logs all queries.
  ERROR = 'error', // Logs all failed queries.
  SCHEMA = 'schema', // Logs all schema build events.
  WARN = 'warn', // Logs all queries that take longer than the slow query execution threshold.
  INFO = 'info', // Logs all query logs.
  LOG = 'log', // Logs all query logs.
  ALL = 'all', // Logs all query logs.
  TRUE = 'true', // Enables the query log.
  FALSE = 'false', // Disables the query log.
}
