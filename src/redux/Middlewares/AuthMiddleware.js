import Axios from 'axios';
import { hideLoading, showLoading, showAlert } from '../Actions/GeneralActions';
import { login, userData, Logout, getIndustries } from '../Actions/AuthAction';
import Storage from '../../utilities/AsyncStorage';
import { headers } from '../../utilities/utils';
import { Alert } from 'react-native';
import { APIS } from '../../APIS/Apis';

export const AuthMiddleware = {
  login: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append('email', params?.email);
          formdata.append('password', params?.password);
          formdata.append('device_id', params?.token);
          formdata.append('role', 'business');
          const data = await Axios.post(APIS.login, formdata);
          if (data?.status == 200) {

            await Storage.setToken(data?.data?.data?.token);
            await Storage.set('@user', JSON.stringify(data?.data?.data));
            dispatch(userData(data?.data?.data));
            dispatch(login(true));
          }
        } catch (error) {
          reject(error);
          Alert.alert('Alert!', error?.response?.data?.message ? error?.response?.data?.message : 'Network Error!');
          // dispatch(
          //   showAlert({
          //     title: 'login',
          //     message: error?.response?.data?.message ? error?.response?.data?.message : 'Network Error!',
          //     type: 'Error',
          //     status: error?.response?.status,
          //   }),
          // );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  signUp: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append('role', 'business');
          formdata.append('name', params?.name);
          formdata.append('email', params?.email);
          // formdata.append('dba_name', params?.dba_name);
          formdata.append('contact_no', params?.contact);
          formdata.append('industry_type_id', params?.industry_id);
          formdata.append('industry_category_id', params?.industry_category_id);
          formdata.append('registered_business_address', params?.address);
          formdata.append('zip_code', params?.zip_code);
          formdata.append('ein', params?.ein);
          formdata.append('password', params?.password);
          formdata.append('confirm_password', params?.confirm_password);
          formdata.append('website', params?.website);

          const data = await Axios.post(APIS.signup, formdata);
          if (data?.status == 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: 'signup',
                message: data?.data?.message,
                type: 'Success',
                status: data?.status,
              }),
            );
          }
        } catch (error) {
          reject(error);
          console.log('error', error);
          dispatch(
            showAlert({
              title: 'signUp',
              message: error?.response?.data?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  getSignupData: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(APIS.industries);
          if (data?.status == 200) {
            resolve(true);
            dispatch(getIndustries(data?.data?.data?.data));
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'industries',
              message: error?.response?.data?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        }
      });
    };
  },

  forgotPassword: ({ email }) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append('email', email);
          const data = await Axios.post(APIS.forgot_password, formdata);
          if (data?.status == 200) {
            resolve(data?.data);
            dispatch(
              showAlert({
                title: 'forgotPassword',
                message: data?.data?.message,
                type: 'Success',
                status: data?.status,
              }),
            );
          } else {
            reject(data?.data);
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'forgotPassword',
              message: error?.response?.data?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  verifyCode: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append('email', params?.email);
          formdata.append('code', params?.code);
          const data = await Axios.post(APIS.verify_code, formdata);
          if (data?.status == 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: 'Verify Code',
                message: data?.data?.message,
                type: 'Success',
                status: data?.status,
              }),
            );
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Verify Code',
              message: error?.response?.data?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  changePassword: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append('email', params?.email);
          formdata.append('password', params?.password);
          formdata.append('confirm_password', params?.confirm_password);
          const data = await Axios.post(APIS.change_password, formdata);
          if (data?.status == 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: 'Change password',
                message: data?.data?.message,
                type: 'Success',
                status: data?.status,
              }),
            );
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Change password',
              message: error?.response?.data?.message,
              type: 'Success',
              status: data?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  onUpdateProfile: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append('name', params?.name);
          // formdata.append('dba_name', params?.dba_name);
          formdata.append('contact_no', params?.contact_no);
          formdata.append('registered_business_address', params?.address);
          formdata.append('zip_code', params?.zip_code);
          if (params?.profile_picture)
            formdata.append('profile_picture', params?.profile_picture);

          const data = await Axios.post(
            APIS.update_profile,
            formdata,
            await headers.config(),
          );
          if (data?.status == 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: 'Update Profile',
                message: data?.data?.message,
                type: 'Success',
                status: data?.status,
              }),
            );
            await Storage.set('@user', JSON.stringify(data?.data?.data));
            dispatch(userData(data?.data?.data));
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'Update Profile',
              message: error?.response?.data?.message ? error?.response?.data?.message : 'Metwork Error!',
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  logOut: () => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(APIS.logout, await headers.config());
          if (data?.status == 200) {
            resolve(true);
          }
        } catch (error) {
          reject(error);
        } finally {
          Storage.clearStorage();
          dispatch(Logout());
          dispatch(hideLoading());
        }
      });
    };
  },

  check_user_existence: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append('email', params?.email);
          const data = await Axios.post(APIS.check_social_login, formdata);

          if (data?.data?.success == true) {
            resolve(true)
          } else {
            resolve(false)
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'check user existence',
              message: error?.response?.data?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  social_login: params => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append('email', params?.email);
          formdata.append('device_id', params?.deviceID);
          if (params?.name)
            formdata.append('name', params?.name);
          if (params?.industry_id)
            formdata.append('industry_type_id', params?.industry_id);
          if (params?.vendor_id)
            formdata.append('industry_category_id', params?.vendor_id);
          const data = await Axios.post(APIS.social_login, formdata);
          if (data?.status == 200) {
            resolve(true)
            await Storage.setToken(data?.data?.data?.token);
            await Storage.set('@user', JSON.stringify(data?.data?.data));
            dispatch(userData(data?.data?.data));
            dispatch(login(true));
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: 'social login',
              message: error?.response?.data?.message,
              type: 'Error',
              status: error?.response?.status,
            }),
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  delAcc: () => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(APIS.delete_user, await headers.config());
          if (data?.status == 200) {
            resolve(data?.data);
            Storage.clearStorage();
            dispatch(Logout());
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'delete account',
              message: error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong!',
              type: 'Error',
              status: error?.response?.status,
            }),
          );
          reject(error);
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },
};
