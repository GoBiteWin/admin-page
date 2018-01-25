import {Router, RouterConfiguration} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';

@inject(HttpClient)
export class App {
  toSend="";
  http;
  url;
  urlBase="https://requestb.in/1h75f9a1";
  body = "";
  
  constructor(http){
    /*httpClient.configure(config => {
      config 
        .withBaseUrl('https://requestb.in/')
        .withDefaults({
          mode: 'no-cors' ,
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch',
            'Content-Type': 'application/json'
          }
        })
        .withInterceptor ({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            if (response.status == 200) {
              console.log("Successful!");
            } else {
              console.log(`Error. Recieved a ${response.status} instead.`);
            }
            return response;
          }
        });
    });*/
    this.http = http;
  }

  resetVisualCadence(){
    this.url = this.urlBase + "?=" + this.toSend;
    
    this.http.fetch(this.url, {method: 'post', body: json(this.body)})
      .then(response => {
        //response.json();
        //console.log(response);
      });
      /*.then(response => response.json())
      .then(data => {
        console.log(data.description);
      });*/
  }
}
