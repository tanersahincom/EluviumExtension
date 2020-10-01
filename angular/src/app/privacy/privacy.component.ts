import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BottomNavItem } from 'ngx-bottom-nav';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  items: BottomNavItem[];
  constructor(private translate: TranslateService)
  {
    this.setupNavigation();
    this.checkSettings();
    this.checkAllSettings();
  }
  blockAds=true;
  webRtc=true;
  fingerprint=true;
  clearCookies=true;
  disableFlash=true;
  spoofingScreen=true;
  browserProtection=true;
  blockCookies=true;
  blockadsOnChange(toggle)
  {
    if(toggle.checked)
    {
      localStorage.removeItem('blockAds');
    }
    else
    {
      localStorage.setItem('blockAds','false');
    }
    this.checkAllSettings();
  }
  blockCookiesOnChange(toggle)
  {
    if(toggle.checked)
    {
      localStorage.removeItem('blockCookies');
    }
    else
    {
      localStorage.setItem('blockCookies','false');
    }
    this.checkAllSettings();
  }
  webRtcOnChange(toggle)
  {
    if(toggle.checked)
    {
      chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
        value: false,
        scope: 'regular'
      });

      chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
        value: false
      });
      localStorage.removeItem('webRtc');
    }
    else
    {
      chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
        value: true,
        scope: 'regular'
      });

      chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
        value: true
      });
      localStorage.setItem('webRtc','false');
    }
    this.checkAllSettings();
  }
  fingerprintOnChange(toggle)
  {
    if(toggle.checked)
    {
      localStorage.removeItem('fingerprint');
    }
    else
    {
      localStorage.setItem('fingerprint','false');
    }
    this.checkAllSettings();
  }
  clearCookiesOnChange(toggle)
  {
    if(toggle.checked)
    {
      localStorage.removeItem('clearCookies');
    }
    else
    {
      localStorage.setItem('clearCookies','false');
    }
    this.checkAllSettings();
  }
  disableFlashOnChange(toggle)
  {
    if(toggle.checked)
    {
      chrome.contentSettings.plugins.set({
        primaryPattern: '<all_urls>',
        resourceIdentifier: {
            id: 'adobe-flash-player'
        },
        setting: 'block'
      });
      localStorage.removeItem('disableFlash');
    }
    else
    {
      chrome.contentSettings.plugins.set({
        primaryPattern: '<all_urls>',
        resourceIdentifier: {
            id: 'adobe-flash-player'
        },
        setting: 'allow'
      });
      localStorage.setItem('disableFlash','false');
    }
    this.checkAllSettings();
  }
  spoofingScreenOnChange(toggle)
  {
    if(toggle.checked)
    {
      localStorage.removeItem('spoofingScreen');
    }
    else
    {
      localStorage.setItem('spoofingScreen','false');
    }
    this.checkAllSettings();
  }
  protectionOnChange(toggle)
  {
    if(toggle.checked)
    {
      this.blockAds=true;
      this.webRtc=true;
      this.fingerprint=true;
      this.clearCookies=true;
      this.disableFlash=true;
      this.spoofingScreen=true;
      this.blockCookies = true;
      this.removeItems();
    }
    else
    {
      this.blockAds=false;
      this.webRtc=false;
      this.fingerprint=false;
      this.clearCookies=false;
      this.disableFlash=false;
      this.spoofingScreen=false;
      this.blockCookies = false;
      this.setItems();
    }
  }
  private setupNavigation() {
    let vault;
    let generator;
    let account;
    let settings;
    let security;
    this.translate.get('Navigation.Vault').subscribe(p => vault = p);
    this.translate.get('Navigation.Generator').subscribe(p => generator = p);
    this.translate.get('Navigation.Account').subscribe(p => account = p);
    this.translate.get('Navigation.Settings').subscribe(p => settings = p);
    this.translate.get('Navigation.Security').subscribe(p => security = p);
    this.items = [
        {icon: 'lock', label: vault, routerLink: '/dashboard'},
        {icon: 'refresh', label: generator, routerLink: '/generator'},
        {icon: 'account_circle', label: account, routerLink: '/account'},
        {icon: 'settings', label: settings, routerLink: '/setting'},
        {icon: 'security', label: security, routerLink: '/privacy'}
      ];
  }
  private checkSettings()
  {
    if(localStorage.getItem('blockAds') != null)
    {
      this.blockAds = false;
    }
    if(localStorage.getItem('webRtc') != null)
    {
      this.webRtc = false;
    }
    if(localStorage.getItem('fingerprint') != null)
    {
      this.fingerprint = false;
    }
    if(localStorage.getItem('clearCookies') != null)
    {
      this.clearCookies = false;
    }
    if(localStorage.getItem('disableFlash') != null)
    {
      this.disableFlash = false;
    }
    if(localStorage.getItem('spoofingScreen') != null)
    {
      this.spoofingScreen = false;
    }
    if(localStorage.getItem('blockCookies') != null)
    {
      this.blockCookies = false;
    }
  }
  private checkAllSettings()
  {
    if(this.blockAds && this.webRtc && this.fingerprint && this.clearCookies &&
      this.disableFlash && this.spoofingScreen && this.blockCookies)
    {
      this.removeItems();
      this.browserProtection=true;
    }
    if(!this.blockAds && !this.webRtc && !this.fingerprint && !this.clearCookies &&
       !this.disableFlash && !this.spoofingScreen && !this.blockCookies)
    {
      this.setItems();
      this.browserProtection=false;
    }
  }
  private removeItems()
  {
    localStorage.removeItem('blockAds')
    localStorage.removeItem('webRtc')
    localStorage.removeItem('fingerprint')
    localStorage.removeItem('clearCookies')
    localStorage.removeItem('disableFlash')
    localStorage.removeItem('spoofingScreen')
    localStorage.removeItem('blockCookies')
  }
  private setItems()
  {
    localStorage.setItem('blockAds','false')
    localStorage.setItem('webRtc','false')
    localStorage.setItem('fingerprint','false')
    localStorage.setItem('clearCookies','false')
    localStorage.setItem('disableFlash','false')
    localStorage.setItem('spoofingScreen','false')
    localStorage.setItem('blockCookies','false')
  }
}