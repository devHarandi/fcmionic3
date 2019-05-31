import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FCM,NotificationData } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private fcm:FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.fcm.getToken().then(
        (token: string)=>{
          console.log("getToken is : "+token);
        }
      ).catch(error=>{
        console.log(error);
      });  

      this.fcm.onTokenRefresh().subscribe((token: string) =>{
        console.log("initialize token : "+token);
      });

      this.fcm.onNotification().subscribe(data => {

        if(data.wasTapped)
        {
          console.log("data Wastapped: "+JSON.stringify(data));
        }
        else
        {
            console.log("data Dont Wastapped: "+JSON.stringify(data));
        }

      },error =>{
        console.log("error Onnotification : "+error);
      });

    });
  }
}

