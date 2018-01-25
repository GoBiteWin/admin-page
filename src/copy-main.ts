import {Aurelia} from 'aurelia-framework'
import {HttpClient, json} from 'aurelia-fetch-client';
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  configureContainer(aurelia.container);

  aurelia.start().then(() => aurelia.setRoot());
}

function configureContainer(container) {
  let http = new HttpClient();
  http.configure(config => {
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
  });
  container.registerInstance(HttpClient, http); // <---- this line ensures everyone that `@inject`s a `HttpClient` instance will get the instance we configured above.
}
