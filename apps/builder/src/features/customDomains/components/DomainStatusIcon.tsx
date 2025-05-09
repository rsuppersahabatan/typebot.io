import { XCircleIcon } from "@/components/icons";
import { toast } from "@/lib/toast";
import { trpc } from "@/lib/trpc";
import { Flex, Tooltip, useDisclosure } from "@chakra-ui/react";
import { CustomDomainConfigModal } from "./CustomDomainConfigModal";

type Props = {
  domain: string;
  workspaceId: string;
};
export default function DomainStatusIcon({ domain, workspaceId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = trpc.customDomains.verifyCustomDomain.useQuery(
    {
      name: domain,
      workspaceId,
    },
    {
      onError: (err) => {
        toast({ description: err.message });
      },
    },
  );

  if (isLoading || data?.status === "Valid Configuration") return null;

  return (
    <>
      <Tooltip label={data?.status}>
        <Flex onClick={onOpen} cursor="pointer">
          <XCircleIcon stroke="red.500" />
        </Flex>
      </Tooltip>
      <CustomDomainConfigModal
        workspaceId={workspaceId}
        isOpen={isOpen}
        domain={domain}
        onClose={onClose}
      />
    </>
  );
}
