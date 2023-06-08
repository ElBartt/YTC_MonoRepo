/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { SQL_CONF } from '../../src/configs/database.config';
import { OAI_CONF } from '../../src/configs/openai.config';
import { YT_CONF } from '../../src/configs/youtube.config';

describe('Configuration objects', () => {
  it('should have all required properties for SQL_CONF', () => {
    expect(SQL_CONF).toHaveProperty('host');
    expect(SQL_CONF).toHaveProperty('user');
    expect(SQL_CONF).toHaveProperty('password');
    expect(SQL_CONF).toHaveProperty('database');
  });

  it('should have all required properties for YT_CONF', () => {
    expect(YT_CONF).toHaveProperty('version');
    expect(YT_CONF).toHaveProperty('auth');
  });

  it('should have all required properties for OAI_CONF', () => {
    expect(OAI_CONF).toHaveProperty('organization');
    expect(OAI_CONF).toHaveProperty('apiKey');
  });
});