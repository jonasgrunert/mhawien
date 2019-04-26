import React from "react";

import Layout from "../components/Layout";
const SuccessPage = () => (
  <div className="notification is-success">
    <span class="icon is-large">
      <i class="fas fa-3x fa-check" />
    </span>
    Du hast es geschafft und bist jetzt für den Workshop angemeldet. Wenn du
    dich abmelden möchtest, dann schreibe bitte eine Mail an{" "}
    <a href="mailto:m.h.awarenessweek@gmail.com?subject=Abmeldung von Workshop&body=Hallo liebes MHAW-Team,%0D%0A ich, DEIN NAME würde mich gerne vom Workshop DEIN WORKSHOP abmelden.%0D%0A Viele Grüße%0D%0A">
      m.h.awarenessweek@gmail.com
    </a>
  </div>
);

export default () => (
  <Layout>
    <SuccessPage />
  </Layout>
);
