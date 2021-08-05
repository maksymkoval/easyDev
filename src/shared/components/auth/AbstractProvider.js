import firebase from 'firebase';
import firebaseAuthSetting from '../../../config/firebase';

/**
 * You can add new providers here, like a twitter, oauth and other
 * @type {{FACEBOOK: string, LOCAL: string, GOOGLE: string, MICROSOFT: string }}
 */
export const providers = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
  MICROSOFT: 'microsoft',
  LOCAL: 'local',
};

export class AbstractProvider {
  providerName = '';

  provider = null;

  constructor(providerName) {
    this.providerName = providerName;
    this.provider = this.getProvider();
  }

  /**
   * Return provider
   * @returns
   * {firebase.auth.GoogleAuthProvider|firebase.auth.FacebookAuthProvider|null}
   */
  getProvider = () => {
    let provider;
    switch (this.providerName) {
      case providers.FACEBOOK:
        return new firebase.auth.FacebookAuthProvider();
      case providers.GOOGLE:
        return new firebase.auth.GoogleAuthProvider();
      case providers.MICROSOFT:
        provider = new firebase.auth.OAuthProvider('microsoft.com');
        provider.setCustomParameters({
          prompt: 'consent',
          tenant: firebaseAuthSetting.microsoftTenantId,
        });
        return provider;
      default:
        return null;
    }
  }

  /**
   * Return InfoUser
   * @param data
   * @returns {{name: *}|{name: *, avatar: string}}
   */
  getUserObjectByProvider = (data) => {
    switch (this.providerName) {
      case providers.FACEBOOK:
      case providers.GOOGLE:
      case providers.MICROSOFT:
        return { name: data.user.displayName, avatar: data.user.photoURL };
      case providers.LOCAL:
        return { name: data.user.email };
      default:
        return { ...data };
    }
  }

  login = async (userProps = {}) => {
    if (this.provider) {
      return firebase.auth().signInWithPopup(this.provider);
    }
    const { username, password } = userProps;
    return firebase.auth().signInWithEmailAndPassword(username, password);
  }
}
