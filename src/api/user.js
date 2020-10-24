import request from '@/utils/request'

export const login = data => {
  return request({
    // headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: '/app/v1_0/sms/codes/' + mobile
  })
}
