import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Headphones, 
  MessageCircle, 
  BookOpen, 
  Mail,
  Phone
} from 'lucide-react';

export function SupportPage() {
  const { t } = useTranslation();

  const supportOptions = [
    {
      title: t('support.liveChat'),
      description: t('support.liveChatDesc'),
      icon: MessageCircle,
      action: t('support.startChat'),
    },
    {
      title: t('support.documentation'),
      description: t('support.documentationDesc'),
      icon: BookOpen,
      action: t('support.viewDocs'),
    },
    {
      title: t('support.emailSupport'),
      description: t('support.emailSupportDesc'),
      icon: Mail,
      action: t('support.sendEmail'),
    },
    {
      title: t('support.phoneSupport'),
      description: t('support.phoneSupportDesc'),
      icon: Phone,
      action: t('support.scheduleCall'),
    },
  ];

  const faqs = [
    {
      question: t('support.faq.createRobot.question'),
      answer: t('support.faq.createRobot.answer'),
    },
    {
      question: t('support.faq.paymentMethods.question'),
      answer: t('support.faq.paymentMethods.answer'),
    },
    {
      question: t('support.faq.upgradePlan.question'),
      answer: t('support.faq.upgradePlan.answer'),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <Headphones className="mx-auto h-12 w-12 text-blue-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          {t('support.howCanWeHelp')}
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          {t('support.chooseOption')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {supportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card key={option.title}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-md bg-blue-500 bg-opacity-10">
                    <Icon className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {option.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {option.description}
                  </p>
                  <Button className="mt-4" variant="outline">
                    {option.action}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card title={t('support.faqTitle')}>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {faq.question}
              </h3>
              <p className="mt-2 text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="text-center">
        <p className="text-gray-500">
          {t('support.stillNeedHelp')}{' '}
          <a href="mailto:support@example.com" className="text-blue-500 hover:text-blue-600">
            {t('support.contactTeam')}
          </a>
        </p>
      </div>
    </div>
  );
}