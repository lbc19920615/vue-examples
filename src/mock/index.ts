import Mock from 'mockjs'
import {userInfoInterface} from "../types/user";
const Random = Mock.Random

function getUserInfo() {
  let data: userInfoInterface =  {
    attentionNum: Random.integer(0, 1000),
    fanNum: Random.integer(0, 1000),
    weiboNum: Random.integer(0, 1000),
  }

  return {
    data: data,
    status: 200,
    msg: '查询成功'
  }
}

Mock.mock('/api/user_info', 'get', getUserInfo)
