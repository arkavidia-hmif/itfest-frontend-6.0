import { TenantAccount, VisitorAccount } from './types';
import { ArkavidiaBaseApi } from './base';

export default class AuthApi extends ArkavidiaBaseApi {
  async loginByUsername(username: string, password: string): Promise<string> {
    const requestBody = { username, password };
    const response = await this.axios.post(`/login`, requestBody);
    const jwt = response.data.data.jwt;

    if (!jwt) { throw new Error('Empty JWT'); }

    return jwt;
  }

  async loginByEmail(email: string, password: string): Promise<string> {
    const requestBody = { email, password };
    const response = await this.axios.post(`/login`, requestBody);
    const jwt = response.data.data.jwt;

    if (!jwt) { throw new Error('Empty JWT'); }

    return jwt;
  }

  async visitorRegister(visitorAccount: VisitorAccount): Promise<string> {
    const requestBody = { ...visitorAccount };
    const response = await this.axios.post(`/register/visitor`, requestBody);
    const jwt = response.data.data.jwt;

    if (!jwt) { throw new Error('Empty JWT'); }

    return jwt;
  }

  async tenantRegister(tenantAccount: TenantAccount): Promise<string> {
    const requestBody = { ...tenantAccount };
    const response = await this.axios.post(`/register/tenant`, requestBody);
    const jwt = response.data.data.jwt;

    if (!jwt) { throw new Error('Empty JWT'); }

    return jwt;
  }

  async activateAccount(key: string) {
    await this.axios.post(`/activate/${key}`, { });
  }
}
