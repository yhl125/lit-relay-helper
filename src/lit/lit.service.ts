import { Injectable } from '@nestjs/common';

@Injectable()
export class LitService {
  private relayServerUrl = 'https://relay-server-staging.herokuapp.com';
  private relayApiKey = 'test';

  async register(username: string) {
    // Generate registration options for the browser to pass to a supported authenticator
    let publicKeyCredentialCreationOptions = null;

    let url = `${this.relayServerUrl}/auth/webauthn/generate-registration-options`;
    if (username !== '') {
      url = `${url}?username=${encodeURIComponent(username)}`;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'api-key': this.relayApiKey,
        Origin: 'https://lit-relay-helper.vercel.app',
      },
    });
    if (response.status < 200 || response.status >= 400) {
      const errorJson = await response.json();
      const errorMsg = errorJson.error || 'Unknown error';
      const relayErr = new Error(`Unable to register credential: ${errorMsg}`);
      throw relayErr;
    }

    // Pass the options to the authenticator and wait for a response
    publicKeyCredentialCreationOptions = await response.json();
    // console.log(publicKeyCredentialCreationOptions);

    // Require a resident key for this demo
    publicKeyCredentialCreationOptions.authenticatorSelection.residentKey =
      'required';
    publicKeyCredentialCreationOptions.authenticatorSelection.requireResidentKey =
      true;
    publicKeyCredentialCreationOptions.extensions = {
      credProps: true,
    };

    return publicKeyCredentialCreationOptions;
  }
}
