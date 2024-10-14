<script lang="ts">
import { AxiosError } from 'axios'
import EmailFrom from '@/components/email-form/EmailForm.vue'
import { sendWmdPageLink } from '~/core/global'
import {
  CHECKIN_CONTINUE_LINK_TEXT,
  EARN_CREDIT
} from '~/core/constants/omniture-events'

export default {
  mixins: [EmailFrom],
  beforeMount() {
    this.emailFormTitle = this.$uiService.emailForm.title
    this.emailFormBody = this.$uiService.emailForm.body
    this.errorCta = this.$uiService.emailForm.contactText
    this.errorLink = this.$uiService.emailForm.supportLink
    this.emailFormPrompt = this.$uiService.emailForm.cmePrompt
  },
  methods: {
    async sendEmailForm(event: MouseEvent) {
      this.isFailure = false
      const activityId = this.$route?.params?.activityId
      if (typeof activityId === 'string' && this.email) {
        this.isLoading = true
        try {
          const redirectionUrl = await this.$liveEventService.registerUserWithCme(
            this.email,
            activityId
          )

          this.logUserAction(event, CHECKIN_CONTINUE_LINK_TEXT)
          window.location.assign(redirectionUrl)
        } catch (e) {
          this.isLoading = false
          this.isFailure = true
          if (e.isAxiosError) {
            const axiosError = e as AxiosError
            this.errorMessage =
              axiosError?.response?.data?.message ||
              this.$uiService.error.errorProcessingEmail
          }
        }
      }
    },
    async logUserAction(event: MouseEvent, linkText: string) {
      const userVars: Record<string, string> = {}
      await sendWmdPageLink(
        EARN_CREDIT.concat(linkText.trimEnd().toLowerCase()),
        event.target,
        userVars
      )
    }
  }
}
</script>
