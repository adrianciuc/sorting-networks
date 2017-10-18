package com.fii.sorting.networks.repository

import com.fii.sorting.networks.model.PersistentLogin
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository
import org.springframework.stereotype.Repository

@Repository
class JpaPersistentTokenRepository implements PersistentTokenRepository {

    static final Logger LOGGER = LoggerFactory.getLogger(JpaPersistentTokenRepository.class)

    @Autowired
    private PersistentLoginRepository persistentLoginRepository

    @Override
    void createNewToken(PersistentRememberMeToken token) {
        LOGGER.debug("Creating token for user {}", token.username)
        PersistentLogin persistentLogin = new PersistentLogin()
        persistentLogin.email = token.username
        persistentLogin.series = token.series
        persistentLogin.token = token.tokenValue
        persistentLogin.lastUsed = token.date
        persistentLoginRepository.save(persistentLogin)
    }

    @Override
    void updateToken(String series, String tokenValue, Date lastUsed) {
        LOGGER.debug("Updating token for series {}", series)
        PersistentLogin persistentLogin = persistentLoginRepository.getOne(series)
        persistentLogin.token = tokenValue
        persistentLogin.lastUsed = lastUsed
        persistentLoginRepository.save(persistentLogin)
    }

    @Override
    PersistentRememberMeToken getTokenForSeries(String seriesId) {
        PersistentLogin persistentLogin = persistentLoginRepository.getOne(seriesId)
        return new PersistentRememberMeToken(persistentLogin.email, persistentLogin.series,
                persistentLogin.token, persistentLogin.lastUsed)
    }

    @Override
    void removeUserTokens(String username) {
        List<PersistentLogin> persistentLogins = persistentLoginRepository.findByEmail(username)
        persistentLogins.isEmpty() ?
                LOGGER.debug("No token found for username {} for deleting it", username) :
                persistentLoginRepository.delete(persistentLogins.first().series)

    }
}
