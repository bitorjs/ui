<template>
  <PageRootContainer>
    <PageContainer>
      <Flex align="between">
        <Skeleton class="icon"></Skeleton>
        <Skeleton class="icon"></Skeleton>
        <Skeleton class="icon"></Skeleton>
        <Skeleton class="icon"></Skeleton>
      </Flex>
      <Flex align="center">
        <Skeleton class="bar"></Skeleton>
      </Flex>
      <Flex direction="column" valign="middle">
        <Skeleton class="line"></Skeleton>
        <Skeleton class="line"></Skeleton>
        <Skeleton class="line"></Skeleton>
        <Skeleton class="line"></Skeleton>
        <Skeleton class="line"></Skeleton>
      </Flex>

      <Flex align="center">
        <Skeleton class="bar"></Skeleton>
      </Flex>

      <Skeleton class="block"></Skeleton>
      <center>
        <Skeleton class="button"></Skeleton>
      </center>
    </PageContainer>
  </PageRootContainer>
</template>

<script>
export default {
  name: "ss"
};
</script>
<style lang="less" scoped>
.icon {
  height: 50px !important;
  width: 50px !important;
}

.line {
  width: 80% !important;
  margin: 15px !important;
}

.bar {
  height: 18px !important;
}

.block {
  margin-top: 5px !important;
  height: 100px !important;
}

.button {
  height: 42px !important;
  width: 80% !important;
  border-radius: 100px !important;
  margin-top: 1rem !important;
}
</style>

