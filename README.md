# URL Shortener

This project is a URL shortener that generates random short IDs for provided URLs and facilitates user access to the original URL using the short ID. It also offers administrative features to track clicks and view statistics.

### Features

* Uses `shortid` to generate random IDs for shortened URLs.
* Provides endpoints for URL shortening, redirection, and administrative functions.
* Tracks clicks and delivers statistics for each shortened URL.

### Endpoints

* **POST /url:** Generates a shortened URL for a valid URL submitted in the request body.
* **GET /:id:** Redirects to the original URL using the provided short URL ID.
* **GET /url/admin/:id:** Returns the number of clicks for a specific shortened URL.
* **GET /url/admin:** Returns all shortened URLs along with their corresponding redirect URLs and total click counts.

### Usage

**1. Installation**

Ensure you have Node.js and npm installed on your system.

- Clone this repository:

```bash
git clone https://github.com/ashesbloom/URL_Shortener.git
```

- Navigate to the project directory:

```bash
cd URL_Shortener
```

- Install dependencies:
  
```bash
npm install
```
**express package:**
```bash
npm i express
```
**mongoose:**
```bash
npm i mongoose
```
**shortid package:**
```bash
npm i shortid
```

**2. Running the Server**

```bash
npm start
```

This starts the server on the default port (usually 3000) but 8000 in this case.

## 3. Example Usage

**Shorten a URL**

- Send a POST request to `/url` with the valid URL in the request body:

```json
{
  "url": "https://example.com/very-long-url-path"
}
```

- The response will contain the shortened URL:

```json
{
  "shortUrl": "https://short.url/abc123"
}
```

**Redirect**

- Access the shortened URL (e.g., `https://short.url/abc123`) in your browser and get redirected to the original URL.

**Admin Dashboard**

- Access the admin dashboard at `/url/admin` to view all shortened URLs with their statistics (requires admin authorization).

### Dependencies

* Node.js
* Express.js
* shortid
* Mongoose
