addEventListener('fetch', event => {
  event.respondWith((async () => {
    const targetDomain = 'firefox-com.foxiproxi.workers.dev';
    const request = event.request;

    if (request.headers.get('User-Agent') === 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko') {
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      const redirectURL = new URL(request.url);
      redirectURL.hostname = targetDomain;
      return fetch(redirectURL, request);
    } else {
      const response = new Response('<h1>Access Denied</h1><p>You are not authorized to access this resource.</p>', {
        status: 403,
        statusText: 'Forbidden',
        headers: {
          'Content-Type': 'text/html'
        }
      });
      return response;
    }
  })());
});
