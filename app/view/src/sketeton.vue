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
  height: 50px;
  width: 50px;
}

.line {
  width: 80%;
  margin: 15px;
}

.bar {
  flex: 1;
  height: 18px;
}

.block {
  margin-top: 5px;
  height: 100px;
}

.button {
  height: 42px;
  width: 80%;
  border-radius: 100px;
  margin-top: 1rem;
}
</style>

