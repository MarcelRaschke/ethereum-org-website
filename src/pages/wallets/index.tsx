import { ComponentPropsWithRef } from "react"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box, Flex, Heading, Text as ChakraText } from "@chakra-ui/react"

import { BasePageProps, Lang } from "@/lib/types"

import ButtonLink from "@/components/Buttons/ButtonLink"
import Callout from "@/components/Callout"
import Card from "@/components/Card"
import CardList from "@/components/CardList"
import FeedbackCard from "@/components/FeedbackCard"
import HorizontalCard from "@/components/HorizontalCard"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Text from "@/components/OldText"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import { Simulator } from "@/components/Simulator"
import { SIMULATOR_ID } from "@/components/Simulator/constants"
import Translation from "@/components/Translation"
import { Divider } from "@/components/ui/divider"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { walletOnboardingSimData } from "@/data/WalletSimulatorData"

import DappsImage from "@/public/images/doge-computer.png"
import ETHImage from "@/public/images/eth-logo.png"
import FindWalletImage from "@/public/images/wallets/find-wallet.png"
import HeroImage from "@/public/images/wallets/wallet-hero.png"

export const StyledCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card
    flex="1 1 30%"
    minW="280px"
    maxW={{ base: "full", md: "46%", lg: "31%" }}
    m={4}
    p={6}
    {...props}
  />
)

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/wallets")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const WalletsPage = () => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-wallets")

  const heroContent = {
    title: t("page-wallets-title"),
    header: t("page-wallets-slogan"),
    subtitle: t("page-wallets-subtitle"),
    image: HeroImage,
    alt: t("page-wallets-alt"),
    // TODO: remove conditional after soft launch
    buttons:
      locale === "en"
        ? [
            {
              href: "/wallets/find-wallet/",
              content: t("page-wallets-find-wallet-link"),
              matomo: {
                eventCategory: "Header buttons",
                eventAction: "click",
                eventName: "Find_wallet",
              },
            },
            {
              href: `#${SIMULATOR_ID}`,
              content: "How to use a wallet",
              matomo: {
                eventCategory: "Header buttons",
                eventAction: "click",
                eventName: "How_to_use_wallet",
              },
              variant: "outline" as const,
            },
          ]
        : [
            {
              href: "/wallets/find-wallet/",
              content: t("page-wallets-find-wallet-link"),
              matomo: {
                eventCategory: "Header button",
                eventAction: "click",
                eventName: "Find_wallet",
              },
            },
          ],
  }

  const cards = [
    {
      emoji: ":dollar:",
      title: t("page-wallets-manage-funds"),
      description: (
        <Translation id="page-wallets:page-wallets-manage-funds-desc" />
      ),
    },
    {
      emoji: ":frame_with_picture:",
      title: t("page-wallets-your-ethereum-account"),
      description: (
        <Translation id="page-wallets:page-wallets-your-ethereum-account-desc" />
      ),
    },
    {
      emoji: ":bust_in_silhouette:",
      title: t("page-wallets-your-login"),
      description: (
        <Translation id="page-wallets:page-wallets-your-login-desc" />
      ),
    },
  ]

  const types = [
    {
      emoji: ":cd:",
      description: <Translation id="page-wallets:page-wallets-cd" />,
    },
    {
      emoji: ":mobile_phone:",
      description: <Translation id="page-wallets:page-wallets-mobile" />,
    },
    {
      emoji: ":globe_with_meridians:",
      description: <Translation id="page-wallets:page-wallets-web-browser" />,
    },
    {
      emoji: ":globe_with_meridians:",
      description: (
        <Translation id="page-wallets:page-wallets-web-browser-extension" />
      ),
    },
    {
      emoji: ":desktop_computer:",
      description: <Translation id="page-wallets:page-wallets-desktop" />,
    },
  ]

  const articles = [
    {
      title: t("page-wallets-protecting-yourself"),
      description: "MyCrypto",
      link: "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
      customEventOptions: {
        eventCategory: "Link",
        eventAction: "Clicked_external",
        eventName: "protecting_yourself",
      },
    },
    {
      title: t("page-wallets-keys-to-safety"),
      description: t("page-wallets-blog"),
      link: "https://www.coinbase.com/learn/crypto-basics/how-to-secure-crypto",
      customEventOptions: {
        eventCategory: "Link",
        eventAction: "Clicked_external",
        eventName: "the_keys_to_keeping_crypto_safe",
      },
    },
  ]

  const guides = [
    {
      title: t("additional-reading-how-to-create-an-ethereum-account"),
      link: "/guides/how-to-create-an-ethereum-account/",
      customEventOptions: {
        eventCategory: "Link",
        eventAction: "Clicked",
        eventName: "Create_eth_acc",
      },
    },
    {
      title: t("additional-reading-how-to-use-a-wallet"),
      link: "/guides/how-to-use-a-wallet/",
      customEventOptions: {
        eventCategory: "Link",
        eventAction: "Clicked",
        eventName: "How_to_use_wallet",
      },
    },
  ]

  return (
    <MainArticle className="width-full auto m-0 flex flex-col items-center">
      <PageMetadata
        title={t("page-wallets-meta-title")}
        description={t("page-wallets-meta-description")}
        image="/images/wallets/wallet-hero.png"
      />

      <PageHero content={heroContent} isReverse />

      <div className="mt-4 w-full bg-[--eth-colors-grayBackground] px-0 py-16 shadow-[inset_0px_1px_0px_var(--eth-colors-tableItemBoxShadow)] lg:mt-8">
        <div className="w-full px-8 py-4 pb-0">
          <h2 className="mb-0 mt-12 text-2xl leading-[1.4] md:text-[2rem]">
            {t("page-wallets-whats-a-wallet")}
          </h2>
        </div>
        <div className="mb-0 flex flex-col justify-between p-8 lg:flex-row">
          <Box
            flexGrow="0"
            flexShrink="1"
            flexBasis="50%"
            me={{ base: 0, lg: 8 }}
            mt={{ lg: 0 }}
            maxWidth={{ lg: "100%" }}
          >
            <Text>{t("page-wallets-description")}</Text>
            <Text>{t("page-wallets-desc-2")}</Text>
            <CardList items={guides} mb={{ base: 6, lg: 0 }} />
          </Box>
          <div className="max-w-full flex-[0_1_50%] lg:ms-8">
            <Text>{t("page-wallets-desc-3")}</Text>
            <Text>{t("page-wallets-desc-4")}</Text>
          </div>
        </div>
        <div className="w-full px-8 py-4">
          <div className="-me-4 -ms-4 flex flex-wrap">
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="-mb-8 mt-8 flex flex-col justify-between p-8 lg:flex-row">
        <div className="max-w-full flex-[0_1_50%] lg:me-8">
          <h2 className="mb-8 mt-12 text-2xl leading-[1.4] md:text-[2rem]">
            {t("page-wallets-accounts-addresses")}
          </h2>
          <Text>{t("page-wallets-accounts-addresses-desc")}</Text>
          <ul>
            <li>
              <Text>
                <Translation id="page-wallets:page-wallets-ethereum-account" />
              </Text>
            </li>
            <li>
              <Text>
                <Translation id="page-wallets:page-wallets-accounts-ethereum-addresses" />
              </Text>
            </li>
            <li>
              <Text>
                <Translation id="page-wallets:page-wallets-ethereum-wallet" />
              </Text>
            </li>
          </ul>
          <Text>{t("page-wallets-most-wallets")}</Text>
        </div>
        <div className="mt-12 max-w-full flex-[0_1_50%] lg:ms-8 lg:mt-0">
          <h2 className="mb-8 mt-12 text-2xl leading-[1.4] md:text-[2rem]">
            {t("page-wallets-types")}
          </h2>
          <Text>{t("page-wallets-types-desc")}</Text>
          <Box className="flex flex-col gap-2">
            {types.map((type, idx) => (
              <HorizontalCard
                key={idx}
                emoji={type.emoji}
                description={type.description}
                className="my-0.5 w-[100%]"
                emojiClassName="text-[2.5rem]"
              />
            ))}
          </Box>
        </div>
      </div>

      {locale === "en" ? (
        <div className="my-20 w-full px-0 py-4">
          <Simulator data={walletOnboardingSimData}>
            <ChakraText
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              fontStyle="italic"
              color="body.medium"
              mb={2}
            >
              Interactive tutorial
            </ChakraText>
            <Heading
              as="h2"
              size={{ base: "xl", lg: "2xl" }}
              lineHeight="115%"
              fontWeight="bold"
              m={0}
            >
              How to use a wallet
            </Heading>
          </Simulator>
        </div>
      ) : (
        <div className="my-12 mt-4 w-full bg-[linear-gradient(49deg,rgba(127,127,213,0.2)_0%,rgba(134,168,231,0.2)_50%,rgba(145,234,228,0.2)_100%)] px-0 py-16 shadow-[inset_0px_1px_0px_var(--eth-colors-tableItemBoxShadow)] lg:mt-8">
          <div className="w-full px-8 py-4">
            <Flex flexDirection="column" alignItems="center" mb="8">
              <h2 className="mb-8 mt-12 text-2xl leading-[1.4] md:text-[2rem]">
                {t("page-wallets-features-title")}
              </h2>
              <Box
                fontSize="xl"
                lineHeight={1.4}
                color="text"
                textAlign="center"
                mb={6}
              >
                {t("page-wallets-features-desc")}
              </Box>
              <ButtonLink
                href="/wallets/find-wallet/"
                customEventOptions={{
                  eventCategory: "header buttons",
                  eventAction: "click",
                  eventName: "Find_wallet",
                }}
              >
                {t("page-wallets-find-wallet-btn")}
              </ButtonLink>
              <Image
                src={FindWalletImage}
                alt=""
                mt={8}
                maxW="800px"
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                w="full"
              />
            </Flex>
          </div>
        </div>
      )}

      <div className="mb-12 flex flex-col justify-between p-8 lg:flex-row">
        <div className="max-w-full flex-[0_1_50%] lg:me-8">
          <h2 className="mb-8 mt-12 text-2xl leading-[1.4] md:text-[2rem]">
            {t("page-wallets-stay-safe")}
          </h2>
          <Box lineHeight={1.4} mb={6} color="text300">
            <Translation id="page-wallets:page-wallets-stay-safe-desc" />
          </Box>
          <Flex direction="column" gap={4}>
            <HorizontalCard
              key="0"
              emoji=":white_check_mark:"
              title={t("page-wallets-take-responsibility")}
              description={t("page-wallets-take-responsibility-desc")}
              emojiClassName="text-2xl"
              className="items-start"
            />
            <HorizontalCard
              key="1"
              emoji=":white_check_mark:"
              title={<Translation id="page-wallets:page-wallets-seed-phrase" />}
              description={t("page-wallets-seed-phrase-desc")}
              emojiClassName="text-2xl"
              className="items-start"
            >
              <Text>{t("page-wallets-seed-phrase-example")}</Text>
              <Box bg="black" p={2} mb={4} borderRadius="base">
                <Text fontFamily="monospace" fontSize="sm" color="white" mb={0}>
                  {t("page-wallets-seed-phrase-snippet")}
                </Text>
              </Box>
              <Text>{t("page-wallets-seed-phrase-write-down")}</Text>
            </HorizontalCard>
            <HorizontalCard
              key="2"
              emoji=":white_check_mark:"
              title={t("page-wallets-bookmarking")}
              description={t("page-wallets-bookmarking-desc")}
              emojiClassName="text-2xl"
              className="items-start"
            />
            <HorizontalCard
              key="3"
              emoji=":white_check_mark:"
              title={t("page-wallets-triple-check")}
              description={t("page-wallets-triple-check-desc")}
              emojiClassName="text-2xl"
              className="items-start"
            />
          </Flex>
        </div>
        <div className="mt-12 max-w-full flex-[0_1_50%] lg:ms-8 lg:mt-0">
          <h2 className="mb-8 mt-12 text-2xl leading-[1.4] md:text-[2rem]">
            {t("page-wallets-tips")}
          </h2>
          <Box lineHeight={1.4} color="text300" mb={6}>
            {t("page-wallets-tips-community")}
          </Box>
          <CardList items={articles} />
        </div>
      </div>

      <div className="w-full px-8 py-4">
        <Divider />

        <h2 className="mb-8 mt-12 text-2xl leading-[1.4] md:text-[2rem]">
          {t("page-wallets-explore")}
        </h2>
        <div className="-me-4 -ms-4 mt-16 flex flex-wrap">
          <Callout
            image={ETHImage}
            titleKey="page-wallets:page-wallets-get-some"
            alt={t("page-wallets-get-some-alt")}
            descriptionKey="page-wallets:page-wallets-get-some-desc"
            className="min-h-full flex-1 basis-[424px]"
          >
            <Box>
              <ButtonLink href="/get-eth/">
                {t("page-wallets-get-some-btn")}
              </ButtonLink>
            </Box>
          </Callout>
          <Callout
            image={DappsImage}
            titleKey="page-wallets:page-wallets-try-dapps"
            alt={t("page-wallets-try-dapps-alt")}
            descriptionKey="page-wallets:page-wallets-try-dapps-desc"
            className="min-h-full flex-1 basis-[424px]"
          >
            <Box>
              <ButtonLink href="/dapps/">
                {t("page-wallets-more-on-dapps-btn")}
              </ButtonLink>
            </Box>
          </Callout>
        </div>
      </div>

      <div className="w-full px-8 py-4">
        <StandaloneQuizWidget quizKey="wallets" />
      </div>

      <div className="w-full px-8 py-4">
        <FeedbackCard />
      </div>
    </MainArticle>
  )
}

export default WalletsPage
