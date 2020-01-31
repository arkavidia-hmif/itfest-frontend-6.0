import {TenantReview} from './types';
import {ArkavidiaBaseApi} from './base';

export default class GameApi extends ArkavidiaBaseApi {
  async play(qrId: string, difficultyLevels: number[]): Promise<void> {
    await this.axios.post(`/tenant/${qrId}/play`, { difficulty: difficultyLevels });
  }

  async getTenantReview(tenantId: number): Promise<number> {
    const response = await this.axios.get(`/tenant/${tenantId}/review`);
    return response.data.data.review;
  }

  async sendTenantReview(tenantId: number, tenantReview: TenantReview): Promise<void> {
    await this.axios.post(`/tenant/${tenantId}/review`, tenantReview);
  }

  async getPlayName(qrId:string): Promise<any>{
    return await this.axios.get(`/user/${qrId}`);
  }
}
