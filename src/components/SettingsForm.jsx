import { useState } from 'react'
import './SettingsForm.css'

const INITIAL = {
  displayName: '',
  email: '',
  bio: '',
  language: 'en',
  timezone: 'America/New_York',
  theme: 'system',
  emailDigest: true,
  productUpdates: false,
  securityAlerts: true,
}

function SettingsForm() {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setStatus('idle')
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function validate(form) {
    const next = {}
    if (!form.displayName.trim()) {
      next.displayName = 'Display name is required.'
    } else if (form.displayName.trim().length < 2) {
      next.displayName = 'Use at least 2 characters.'
    }

    if (!form.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address.'
    }

    if (form.bio.length > 160) {
      next.bio = 'Bio must be 160 characters or fewer.'
    }

    return next
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      return
    }

    setStatus('saved')
  }

  function handleReset() {
    setValues(INITIAL)
    setErrors({})
    setStatus('idle')
  }

  return (
    <div className="settings">
      <header className="settings__intro">
        <p className="settings__brand">Northline</p>
        <h1 className="settings__title">Settings</h1>
        <p className="settings__lede">
          Update your profile, preferences, and how we reach you.
        </p>
      </header>

      <form className="settings__form" onSubmit={handleSubmit} noValidate>
        <section className="settings__section" aria-labelledby="profile-heading">
          <div className="settings__section-head">
            <h2 id="profile-heading">Profile</h2>
            <p>How you appear across Northline.</p>
          </div>

          <div className="settings__fields">
            <div className="field">
              <label htmlFor="displayName">Display name</label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="name"
                value={values.displayName}
                onChange={(e) => update('displayName', e.target.value)}
                aria-invalid={Boolean(errors.displayName)}
                aria-describedby={errors.displayName ? 'displayName-error' : undefined}
              />
              {errors.displayName && (
                <p id="displayName-error" className="field__error" role="alert">
                  {errors.displayName}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => update('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="field__error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field field--full">
              <label htmlFor="bio">
                Bio
                <span className="field__hint">{values.bio.length}/160</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                maxLength={160}
                value={values.bio}
                onChange={(e) => update('bio', e.target.value)}
                aria-invalid={Boolean(errors.bio)}
                aria-describedby={errors.bio ? 'bio-error' : undefined}
                placeholder="A short line about you"
              />
              {errors.bio && (
                <p id="bio-error" className="field__error" role="alert">
                  {errors.bio}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="settings__section" aria-labelledby="prefs-heading">
          <div className="settings__section-head">
            <h2 id="prefs-heading">Preferences</h2>
            <p>Language, time, and appearance.</p>
          </div>

          <div className="settings__fields">
            <div className="field">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={values.language}
                onChange={(e) => update('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="timezone">Timezone</label>
              <select
                id="timezone"
                name="timezone"
                value={values.timezone}
                onChange={(e) => update('timezone', e.target.value)}
              >
                <option value="America/New_York">Eastern Time (US)</option>
                <option value="America/Chicago">Central Time (US)</option>
                <option value="America/Denver">Mountain Time (US)</option>
                <option value="America/Los_Angeles">Pacific Time (US)</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Berlin">Berlin</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>

            <fieldset className="field field--full theme-field">
              <legend>Theme</legend>
              <div className="theme-options" role="radiogroup" aria-label="Theme">
                {[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'system', label: 'System' },
                ].map((option) => (
                  <label key={option.value} className="theme-option">
                    <input
                      type="radio"
                      name="theme"
                      value={option.value}
                      checked={values.theme === option.value}
                      onChange={(e) => update('theme', e.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        <section className="settings__section" aria-labelledby="notify-heading">
          <div className="settings__section-head">
            <h2 id="notify-heading">Notifications</h2>
            <p>Choose what lands in your inbox.</p>
          </div>

          <ul className="toggle-list">
            <li>
              <div>
                <p className="toggle-list__label">Weekly digest</p>
                <p className="toggle-list__desc">A Sunday summary of activity.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={values.emailDigest}
                  onChange={(e) => update('emailDigest', e.target.checked)}
                  aria-label="Weekly digest"
                />
                <span className="switch__track" aria-hidden="true" />
              </label>
            </li>
            <li>
              <div>
                <p className="toggle-list__label">Product updates</p>
                <p className="toggle-list__desc">New features and tips.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={values.productUpdates}
                  onChange={(e) => update('productUpdates', e.target.checked)}
                  aria-label="Product updates"
                />
                <span className="switch__track" aria-hidden="true" />
              </label>
            </li>
            <li>
              <div>
                <p className="toggle-list__label">Security alerts</p>
                <p className="toggle-list__desc">Sign-ins and password changes.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={values.securityAlerts}
                  onChange={(e) => update('securityAlerts', e.target.checked)}
                  aria-label="Security alerts"
                />
                <span className="switch__track" aria-hidden="true" />
              </label>
            </li>
          </ul>
        </section>

        <div className="settings__actions">
          <button type="button" className="btn btn--ghost" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="btn btn--primary">
            Save changes
          </button>
        </div>

        <div
          className={`settings__status${status === 'saved' ? ' is-visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {status === 'saved' ? 'Settings saved.' : '\u00a0'}
        </div>
      </form>
    </div>
  )
}

export default SettingsForm
