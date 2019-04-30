import React from "react";

export const Info = ({ end, start, person, description, place }) => (
  <div className="columns">
    <div className="column">
      {description}
      <br />
      Vernatwortlicher: {person}
    </div>
    <div className="column">
      Von <b>{new Date(start).toLocaleString()}</b> bis{" "}
      <b>{new Date(end).toLocaleString()}</b> in <b>{place}</b>
    </div>
  </div>
);

export const SignUp = ({ title, state }) => {
  switch (state) {
    case "av":
      return (
        <form
          name={title}
          method="post"
          data-netlify
          data-netlify-honeypot="gender"
          action="/success"
        >
          <input type="hidden" name="form-name" value={title} />
          <input type="hidden" name="workshop " value={title} />
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label class="label">Name</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="text"
                    className="input"
                    placeholder="Vorname"
                    name="firstname"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="text"
                    className="input"
                    placeholder="Nachname"
                    name="lastname"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label class="label">E-Mail</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="email"
                    className="input"
                    placeholder="E-Mail"
                    name="email"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <input style={{ display: "none" }} name="gender" />
          <div className="field is-horizontal">
            <div className="field-label is-normal" />
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <button class="button is-primary" type="submit">
                    Anmelden
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    case "fu":
      return (
        <div className="notification is-danger">Sorry das Event ist voll</div>
      );
    case "na":
      return (
        <div className="notification is-primary">
          Für dieses Event musst du dich nicht anmelden
        </div>
      );
    default:
      return <p>Keine weiteren Informationen vorhanden</p>;
  }
};

const Workshop = ({
  title,
  person,
  place,
  description,
  start,
  end,
  show,
  close,
  state
}) => (
  <div className={`modal ${show ? "is-active" : ""}`}>
    <div className="modal-background" />
    <div className="modal-content">
      <div className="box">
        <h1 className="is-size-5-mobile is-size-4-tablet is-size-3-widescreen">
          {title}
        </h1>
        <Info
          end={end}
          person={person}
          start={start}
          description={description}
          place={place}
        />
        <SignUp title={title} state={state} />
      </div>
    </div>
    <button
      className="modal-close is-large"
      aria-label="close"
      onClick={close}
    />
  </div>
);
export default Workshop;
