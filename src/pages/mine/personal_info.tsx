/**
 * @filename task_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务中心
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {get, parseData, styleAssign, toast, transformTime} from "../../utils/datatool";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mr,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as fileActions from '../../actions/file';
import * as loginActions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, Picker, ScrollView, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import ListItem from "../../compoments/list-item";
import TouchableButton from "../../compoments/touchable-button";
import {Enum, User} from "../../const/global";
import {cloudBaseUrl, FileController} from "../../api/httpurl";

interface Props {
  //上传文件
  uploadPicture: any;
  //更新用户信息
  update: any;
  getUserInfo: any;
  userInfo: User;
}

interface State {
  avatar: string;
  name: string;
  sex: number;
  phone: string;
  industry: string;
  position: string;
  yangshi: string;
  wechat: string;
  email: string;
  birthday: string;
  province: string;
  city: string;
  detailAddress: string;
  titleList1: { title: string, subtitle?: string, hasEdit?: boolean }[];
  titleList2: { title: string, subtitle?: string, hasEdit?: boolean }[];
}

@connect(state => state.login, {...fileActions, ...loginActions})
class PersonalInfo extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    disableScroll: true
  }

  constructor(props) {
    super(props);
    console.log(this.viewRef);
    // let test = this.$router.params.itemId;
    let {avatar, name, sex, phone, industry, position, yangshi, wechat, email, birthday, province, city, detailAddress} = props.userInfo;

    this.state = {
      avatar,
      name,
      sex,
      phone,
      industry,
      position,
      yangshi,
      wechat,
      email,
      birthday,
      province,
      city,
      detailAddress,
      titleList1: [{title: '姓名', subtitle: name ? name : '必填', hasEdit: true},
        {title: '性别'},
        {title: '手机', subtitle: phone ? phone : ''},
        {title: '行业', subtitle: industry ? industry : '选择'},
        {title: '职位', subtitle: position ? position : '必填', hasEdit: true}],
      titleList2: [{title: '名片样式', subtitle: '编辑'},
        {title: '微信', subtitle: wechat ? wechat : ''},
        {title: '邮箱', subtitle: email ? email : '选填', hasEdit: true},
        {title: '生日', subtitle: birthday ? transformTime(birthday) : '选填'},
        {title: '地区', subtitle: province ? province + city : '选择'},
        {title: '详细地址', subtitle: detailAddress ? detailAddress : '选填', hasEdit: true}],
    }
  }

  componentDidMount() {
    console.log('用户信息', this.props.userInfo);
    Taro.eventCenter.on('industry', (industry) => {
      console.log('参数回调', industry);
      this.state.titleList1[3].subtitle = industry;

      this.setState({industry, titleList1: this.state.titleList1});
    })
  }

  componentWillUnmount() {
    Taro.eventCenter.off();
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 将文件通过微信Api上传到服务端
   */
  uploadFileTpWx = (path) => {
    let that = this;
    let token = get(Enum.TOKEN);

    Taro.uploadFile({
      url: FileController.uploadPicture,
      filePath: path,
      name: 'file',
      header: {
        'token': token
      },
      success(res) {
        that.setState({avatar: parseData(res.data).data});
        console.log('上传文件', parseData(res.data).data);
      }
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 更新用户信息
   */
  update = () => {
    console.log('函数', this.props)
    let {avatar, name, sex, phone, industry, position, yangshi, wechat, birthday, province, city} = this.state;

    if (avatar.length === 0) {
      toast('头像不能为空');
      return;
    }
    if (name.length === 0) {
      toast('姓名不能为空');
      return;
    }
    if (phone.length === 0) {
      toast('电话不能为空');
      return;
    }
    if (industry.length === 0) {
      toast('行业不能为空');
      return;
    }
    if (position.length === 0) {
      toast('职位不能为空');
      return;
    }

    let paramas = {
      avatar,
      name,
      sex,
      phone,
      industry,
      position,
      yangshi,
      wechat,
      birthday,
      province,
      city
    };

    this.viewRef && this.viewRef.showLoading();
    this.props.update(paramas).then((res) => {
      console.log('更新用户信息', res);
      this.viewRef && this.viewRef.hideLoading();
      toast('信息更新成功');
      this.getUserInfo();
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 获取用户信息
   */
  getUserInfo = () => {
    this.props.getUserInfo().then((res) => {
      console.log('获取用户信息', res);
      console.log('属性', this.props.userInfo);
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  render() {
    let {avatar, titleList1, titleList2, sex} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'个人信息'}/>
        {/*任务列表*/}
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY>
          <TouchableButton customStyle={styleAssign([wRatio(100), h(86), styles.uac, styles.udr, styles.ujb,
            bgColor(commonStyles.whiteColor), pl(20), pr(20)])}
                           onClick={() => {
                             Taro.chooseImage({count: 1}).then((res) => {
                               console.log('图片路径', res.tempFiles[0].path)
                               this.setState({avatar: res.tempFiles[0].path})
                               this.uploadFileTpWx(res.tempFiles[0].path);
                             });
                           }}>
            <Text style={styleAssign([fSize(14), color('#727272')])}>头像</Text>
            <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                   src={avatar && avatar.length !== 0 ? avatar : `${cloudBaseUrl}ico_default.png`}/>
          </TouchableButton>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              titleList1.map((value, index) => {
                if (value.title === '性别') {
                  return (
                    <View style={styleAssign([wRatio(100)])}>
                      <View
                        style={styleAssign([wRatio(100), h(51), styles.uac, styles.udr, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                        <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20)])}>性别</Text>
                        <View style={styleAssign([styles.uac, styles.udr])}>
                          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}
                                           onClick={() => {
                                             console.log('男')
                                             this.setState({sex: 1})
                                           }}>
                            <Image
                              style={styleAssign([w(18), h(18), radiusA(9)])}
                              src={sex === 1 ?`${cloudBaseUrl}ico_checked.png`:`${cloudBaseUrl}ico_nochecked.png`}/>
                            <Text style={styleAssign([fSize(14), color('#979797'), ml(10)])}>男</Text>
                          </TouchableButton>
                          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, ml(20), mr(20)])}
                                           onClick={() => {
                                             console.log('女')
                                             this.setState({sex: 2})
                                           }}>
                            <Image
                              style={styleAssign([w(18), h(18), radiusA(9)])}
                              src={sex === 2 ?`${cloudBaseUrl}ico_checked.png` :`${cloudBaseUrl}ico_nochecked.png`}/>
                            <Text style={styleAssign([fSize(14), color('#979797'), ml(10)])}>女</Text>
                          </TouchableButton>
                        </View>
                      </View>
                      <View
                        style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), {marginLeft: '5%'}])}/>
                    </View>
                  );
                }
                return (<ListItem title={value.title} subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    if (title === '联系方式') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/contact_way`
                                      });
                                    } else if (title === '行业') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/industry_list`,
                                        success: (e) => {
                                          console.log('参数回传1', e);
                                        }
                                      });
                                    }
                                  }
                                  } onTextChange={(e) => {
                  this.setState({name: e.detail.value});
                  console.log(e);
                }
                }/>);
              })
            }
          </View>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              titleList2.map((value: any, index) => {

                if (value.title === '生日') {
                  return (<Picker mode='date' onChange={(e) => {
                    titleList2[3].subtitle = e.detail.value;
                    this.setState({
                      titleList2,
                      birthday: e.detail.value
                    })
                  }} value={value.subtitle}>
                    <ListItem title={value.title} subTitle={value.subtitle} key={index}
                              hasEdit={value.hasEdit}/>
                  </Picker>);
                } else if (value.title === '地区') {
                  return (<Picker mode='region' onChange={(e) => {
                    console.log(e.detail)
                    titleList2[4].subtitle = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                    this.setState({
                      titleList2,
                      province: e.detail.value[0],
                      city: e.detail.value[1] + e.detail.value[2]
                    })
                  }} value={[]}>
                    <ListItem title={value.title} subTitle={value.subtitle} key={index}
                              hasEdit={value.hasEdit}
                              onTextChange={(e) => {
                                console.log(e);
                                if (value.subtitle === '邮箱') {
                                  this.setState({email: e.detail.value});
                                } else if (value.subtitle === '地址') {
                                  this.setState({detailAddress: e.detail.value});
                                }
                              }
                              }/>
                  </Picker>);
                }
                return (<ListItem title={value.title} subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    if (title === '我的标签') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/my_tags`
                                      });
                                    }
                                  }
                                  }/>);
              })
            }
          </View>
          {/*保存*/}
          <BottomButon title={'保存'} onClick={() => {
            this.update();
          }}/>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default PersonalInfo;
