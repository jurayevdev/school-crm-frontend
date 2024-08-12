<template>
  <div class="px-2">
    <!-- ----------------------------------------- MODAL -------------------------------------------------------- -->
    <!-- Main modal -->
    <div
      :class="
        modal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-5xl h-auto">
        <!-- Modal content -->
        <div
          class="relative p-4 rounded-lg shadow sm:p-5"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <!-- Modal header -->
          <div
            class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
          >
            <h3 class="text-lg">Yangi savolni qo'shish</h3>
            <button
              @click="modal = false"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form @submit.prevent="createProduct">
            <div class="grid sm:flex sm:flex-col gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm text-amber-900 bg-amber-200 px-3 font-medium py-1 rounded-[5px] uppercase"
                  ><span></span>Savol</label
                >
                <textarea
                  v-model="form.question"
                  cols="30"
                  rows="10"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Savolni yozing.."
                  required
                ></textarea>
              </div>

              <div class="flex flex-col justify-between gap-8">
                <div class="w-full flex gap-5">
                  <div class="w-1/2">
                    <label
                      for="a"
                      class="block mb-2 text-sm text-amber-900 bg-amber-200 text-center font-medium py-0.5 rounded-[5px] uppercase"
                      >Variant: A</label
                    >
                    <input
                      v-model="form.a"
                      type="text"
                      name="a"
                      id="a"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="A variantni kiriting"
                      required
                    />
                  </div>

                  <div class="w-1/2">
                    <label
                      for="b"
                      class="block mb-2 text-sm text-amber-900 bg-amber-200 text-center font-medium py-0.5 rounded-[5px] uppercase"
                      >Variant: B</label
                    >
                    <input
                      v-model="form.b"
                      type="text"
                      name="b"
                      id="b"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="B variantni kiriting"
                      required
                    />
                  </div>
                </div>

                <div class="w-full flex gap-5">
                  <div class="w-1/2">
                    <label
                      for="c"
                      class="block mb-2 text-sm text-amber-900 bg-amber-200 text-center font-medium py-0.5 rounded-[5px] uppercase"
                      >Variant: C</label
                    >
                    <input
                      v-model="form.c"
                      type="text"
                      name="c"
                      id="c"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="C variantni kiriting"
                      required
                    />
                  </div>

                  <div class="w-1/2">
                    <label
                      for="d"
                      class="block mb-2 text-sm text-amber-900 bg-amber-200 text-center font-medium py-0.5 rounded-[5px] uppercase"
                      >Variant: D</label
                    >
                    <input
                      v-model="form.d"
                      type="text"
                      name="d"
                      id="d"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="D variantni kiriting"
                      required
                    />
                  </div>
                </div>

                <div class="w-1/2 mx-auto">
                  <label
                    for="category"
                    class="block mb-2 max-w-fit mx-auto px-5 text-sm font-medium text-center text-amber-900 bg-amber-200 py-1 rounded-[5px]"
                    >Tog'ri javobni belgilang</label
                  >
                  <div
                    class="flex justify-center items-center gap-5 font-bold pt-2"
                  >
                    <p
                      @click="form.true_answer = 'a'"
                      :class="{
                        'ring-4 ring-blue-500 bg-amber-300':
                          form.true_answer == 'a',
                      }"
                      class="bg-gray-100 text-black w-7 h-7 text-center cursor-pointer hover:bg-amber-300 rounded-full"
                    >
                      A
                    </p>
                    <p
                      @click="form.true_answer = 'b'"
                      :class="{
                        'ring-4 ring-blue-500 bg-amber-300':
                          form.true_answer == 'b',
                      }"
                      class="bg-gray-100 text-black w-7 h-7 text-center cursor-pointer hover:bg-amber-300 rounded-full"
                    >
                      B
                    </p>
                    <p
                      @click="form.true_answer = 'c'"
                      :class="{
                        'ring-4 ring-blue-500 bg-amber-300':
                          form.true_answer == 'c',
                      }"
                      class="bg-gray-100 text-black w-7 h-7 text-center cursor-pointer hover:bg-amber-300 rounded-full"
                    >
                      C
                    </p>
                    <p
                      @click="form.true_answer = 'd'"
                      :class="{
                        'ring-4 ring-blue-500 bg-amber-300':
                          form.true_answer == 'd',
                      }"
                      class="bg-gray-100 text-black w-7 h-7 text-center cursor-pointer hover:bg-amber-300 rounded-full"
                    >
                      D
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                @click="modal = false"
                type="button"
                class="text-gray-500 border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- EMPLYE TABLE ------------------------------------------------- -->

    <!-- ----------------------------------------- Edit MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      :class="
        edit.toggle
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-5xl h-auto">
        <!-- Modal content -->
        <div
          class="relative p-4 rounded-lg shadow sm:p-5"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <!-- Modal header -->
          <div
            class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
          >
            <h3 class="text-lg">Yangi savolni qo'shish</h3>
            <button
              @click="edit.toggle = false"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form @submit.prevent="editProduct">
            <div class="grid sm:flex sm:flex-col gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm text-amber-900 bg-amber-200 px-3 font-medium py-1 rounded-[5px] uppercase"
                  ><span></span>Savol</label
                >
                <textarea
                  v-model="edit.question"
                  cols="30"
                  rows="10"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Savolni yozing.."
                  required
                ></textarea>
              </div>

              <div class="flex flex-col justify-between gap-8">
                <div class="w-full flex gap-5">
                  <div class="w-1/2">
                    <label
                      for="a"
                      class="block mb-2 text-sm text-amber-900 bg-amber-200 text-center font-medium py-0.5 rounded-[5px] uppercase"
                      >Variant: A</label
                    >
                    <input
                      v-model="edit.a"
                      type="text"
                      name="a"
                      id="a"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="A variantni kiriting"
                      required
                    />
                  </div>

                  <div class="w-1/2">
                    <label
                      for="b"
                      class="block mb-2 text-sm text-amber-900 bg-amber-200 text-center font-medium py-0.5 rounded-[5px] uppercase"
                      >Variant: B</label
                    >
                    <input
                      v-model="edit.b"
                      type="text"
                      name="b"
                      id="b"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="B variantni kiriting"
                      required
                    />
                  </div>
                </div>

                <div class="w-full flex gap-5">
                  <div class="w-1/2">
                    <label
                      for="c"
                      class="block mb-2 text-sm text-amber-900 bg-amber-200 text-center font-medium py-0.5 rounded-[5px] uppercase"
                      >Variant: C</label
                    >
                    <input
                      v-model="edit.c"
                      type="text"
                      name="c"
                      id="c"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="C variantni kiriting"
                      required
                    />
                  </div>

                  <div class="w-1/2">
                    <label
                      for="d"
                      class="block mb-2 text-sm text-amber-900 bg-amber-200 text-center font-medium py-0.5 rounded-[5px] uppercase"
                      >Variant: D</label
                    >
                    <input
                      v-model="edit.d"
                      type="text"
                      name="d"
                      id="d"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="D variantni kiriting"
                      required
                    />
                  </div>
                </div>

                <div class="w-1/2 mx-auto">
                  <label
                    for="category"
                    class="block mb-2 max-w-fit mx-auto px-5 text-sm font-medium text-center text-amber-900 bg-amber-200 py-1 rounded-[5px]"
                    >Tog'ri javobni belgilang</label
                  >
                  <div
                    class="flex justify-center items-center gap-5 font-bold pt-2"
                  >
                    <p
                      @click="edit.true_answer = 'a'"
                      :class="{
                        'ring-4 ring-blue-500 bg-amber-300':
                          edit.true_answer == 'a',
                      }"
                      class="bg-gray-100 text-black w-7 h-7 text-center cursor-pointer hover:bg-amber-300 rounded-full"
                    >
                      A
                    </p>
                    <p
                      @click="edit.true_answer = 'b'"
                      :class="{
                        'ring-4 ring-blue-500 bg-amber-300':
                          edit.true_answer == 'b',
                      }"
                      class="bg-gray-100 text-black w-7 h-7 text-center cursor-pointer hover:bg-amber-300 rounded-full"
                    >
                      B
                    </p>
                    <p
                      @click="edit.true_answer = 'c'"
                      :class="{
                        'ring-4 ring-blue-500 bg-amber-300':
                          edit.true_answer == 'c',
                      }"
                      class="bg-gray-100 text-black w-7 h-7 text-center cursor-pointer hover:bg-amber-300 rounded-full"
                    >
                      C
                    </p>
                    <p
                      @click="edit.true_answer = 'd'"
                      :class="{
                        'ring-4 ring-blue-500 bg-amber-300':
                          edit.true_answer == 'd',
                      }"
                      class="bg-gray-100 text-black w-7 h-7 text-center cursor-pointer hover:bg-amber-300 rounded-full"
                    >
                      D
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                @click="edit.toggle = false"
                type="button"
                class="text-gray-500 border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                O'zgartirish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- Edit Modal ------------------------------------------------- -->

    <!-- ----------------------------------------- Delete modal ---------------------------------------------------- -->
    <div
      :class="
        remove.toggle
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 max-w-5xl min-w-[30%] h-auto">
        <!-- Modal content -->
        <div
          class="relative p-4 rounded-lg shadow sm:p-5"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <!-- Modal header -->
          <div
            class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
          >
            <h3
              class="text-lg"
              :class="navbar.userNav ? 'text-white' : 'text-black'"
            >
              Savolni o'chirib tashlash
            </h3>
            <button
              @click="remove.toggle = false"
              type="button"
              class="bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              :class="navbar.userNav ? 'text-white' : 'text-black'"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div :class="{ darkForm: navbar.userNav }">
            <div class="grid font-medium gap-4 mb-4 grid-cols-1">
              <div>
                <div></div>
                <h1
                  class="text-2xl"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Siz savolni o'chirishni xohlaysizmi?
                </h1>
              </div>
              <div
                class="w-full flex items-center justify-between border-t pt-5 mt-5"
              >
                <button
                  @click="remove.toggle = false"
                  type="button"
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  @click="deleteProduct"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------- delete modal end ---------------------------------------------------- -->

    <section class="md:py-4" :class="{ 'text-white': navbar.userNav }">
      <!------------------------------------------- Placeholder ------------------------------------------->
      <div v-show="!store.allProducts">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Placeholder ------------------------------------------->

      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.allProducts" class="w-full max-w-screen">
        <!-- Start coding here -->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="w-full flex items-center lg:justify-start lg:pb-0 pb-4 justify-between gap-5"
          >
            <h1 class="text-blue-700 font-bold text-lg">Savollar</h1>
            <div
              class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
            >
              <button
                v-show="!store.guard"
                @click="modal = true"
                id=""
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 sm:py-2"
              >
                <span class="sm:block hidden">Savol qo'shish</span>
                <i class="sm:hidden block bx bxs-user-plus text-lg"></i>
              </button>
            </div>
          </div>

          <div class="whitespace-nowrap">
            <button
              @click="router.back(-1)"
              class="btn shadow-lg rounded-lg px-5 py-2.5 text-white focus:ring-2"
            >
              Orqaga qaytish
            </button>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative shadow-md rounded-lg overflow-hidden"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="overflow-x-auto px-5"
            v-for="(i, index) in store.allProducts.questions"
            :key="i.id"
          >
            <div v-show="!store.error && !(store.guard == 'o\'quvchi')">
              <div class="flex w-full">
                <div
                  @click="accordion(i.id)"
                  class="my-5 w-[150%]"
                  id="accordion-collapse-heading-1"
                >
                  <button
                    type="button"
                    class="flex items-center justify-between w-full text-left rounded-lg bg-[rgba(213,219,242,0.5)] py-[24px] px-[32px]"
                  >
                    <div class="flex items-center gap-5">
                      <p
                        class="btn min-w-[50px] min-h-[50px] sm:h-[35px] 2xl:w-[55px] 2xl:h-[50px] flex items-center font-bold justify-center text-[16px] 2xl:text-[20px] text-white rounded-full"
                      >
                        {{ index + 1 }}
                      </p>
                      <h2 class="w-full text-[14px] sm:text-[16px]">
                        {{ i.question }}
                      </h2>
                    </div>
                    <div>
                      <i
                        :class="
                          store.plus == i.id
                            ? 'bx bx-minus bg-white p-2 text-[#4141eb] text-[30px] rounded-full'
                            : 'bx bx-plus bg-white p-2 text-[#4141eb] text-[30px] rounded-full'
                        "
                      ></i>
                    </div>
                  </button>
                </div>
                <div v-show="!store.guard" class="mx-5 my-auto">
                  <i
                    @click="getOneProduct(i.id, 'edit')"
                    class="bx bxs-pencil bg-blue-300 mb-5 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                  >
                  </i>
                  <i
                    @click="deleteFunc(i.id)"
                    class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                  >
                  </i>
                </div>
              </div>
              <div :id="`answers${i.id}`" class="hidden w-[93%]">
                <div
                  class="flex flex-col gap-y-5 border p-5 border-t-0 border-[#4141eb] rounded-b-lg"
                  :class="
                    navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'
                  "
                  v-if="i.answers"
                >
                  <p
                    class="w-full text-justify text-black flex gap-3 p-5 rounded-lg"
                    :class="
                      store.trueAnswers[index] == 'a'
                        ? 'bg-blue-400'
                        : 'bg-red-400'
                    "
                  >
                    <strong>A:</strong>
                    <span>{{ i.answers[0]?.a }}</span>
                  </p>
                  <p
                    :class="
                      store.trueAnswers[index] == 'b'
                        ? 'bg-blue-400'
                        : 'bg-red-400'
                    "
                    class="w-full text-justify text-black flex gap-3 p-5 rounded-lg"
                  >
                    <strong>B:</strong>
                    <span>{{ i.answers[0]?.b }}</span>
                  </p>
                  <p
                    :class="
                      store.trueAnswers[index] == 'c'
                        ? 'bg-blue-400'
                        : 'bg-red-400'
                    "
                    class="w-full text-justify text-black flex gap-3 p-5 rounded-lg"
                  >
                    <strong>C:</strong>
                    <span>{{ i.answers[0]?.c }}</span>
                  </p>
                  <p
                    :class="
                      store.trueAnswers[index] == 'd'
                        ? 'bg-blue-400'
                        : 'bg-red-400'
                    "
                    class="w-full text-justify text-black flex gap-3 p-5 rounded-lg"
                  >
                    <strong>D:</strong>
                    <span>{{ i.answers[0]?.d }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            v-show="store.allProducts && store.error"
            class="w-full max-w-screen text-center p-20 text-2xl font-medium"
          >
            <h1>{{ store.allProducts }}</h1>
          </div>
          <div
          v-show="store.guard == 'o\'quvchi'"
            class="w-full max-w-screen text-center p-20 text-2xl font-medium"
          >
            <h1>Siz savollarni ko'rish huququga ega emassiz!</h1>
          </div>
          <nav
            class="flex flex-row justify-between items-center md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal">
              Sahifa
              <span class="font-semibold">1 - 10</span>
              dan
              <span class="font-semibold">10</span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight"
                  >Next</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const modal = ref(false);

const store = reactive({
  allProducts: false,
  error: false,
  subjects: [{ title: "Fan yaratilmagan" }],
  accordion: [],
  plus: "",
  guard: "",
  trueAnswers: [],
});

function enterSlug(name) {
  router.push(`./tests/question/${name.toLowerCase()}`);
}

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

function accordion(id) {
  for (let i of store.accordion) {
    if (i != id) {
      document.querySelector(`#answers${i}`).classList.add("hidden");
    }
  }
  let show = document.querySelector(`#answers${id}`);
  show.classList.toggle("hidden");
  store.accordion.push(id);
  if (store.plus == id) {
    store.plus = "";
  } else {
    store.plus = id;
  }
}

// ----------------------------------- forms -----------------------------------
const form = reactive({
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
  true_answer: "",
  test_group_id: "",
  question_id: "",
});

const edit = reactive({
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
  true_answer: "",
  test_group_id: "",
  question_id: "",
  id: "",
  toggle: false,
});

const remove = reactive({
  id: "",
  toggle: false,
});

// ----------------------------------- axios --------------------------------
const getProduct = () => {
  axios
    .get(`/test-group/${+router.currentRoute?.value?.params?.name}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      store.trueAnswers = [];
      for (let i of res.data.questions) {
        store.trueAnswers.push(i.answers[0].true_answer);
      }
      store.allProducts = res.data;
      if (store.allProducts.questions.length != 0) {
        store.error = false;
      } else {
        store.allProducts = "Savollar topilmadi";
        store.error = true;
      }
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
      store.allProducts = error.response.data.message;
      store.error = true;
      console.log("error", error);
    });
};

const getOneProduct = (id) => {
  axios
    .get(`/question/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      edit.question = res.data.question;
      edit.a = res.data.answers[0]?.a;
      edit.b = res.data.answers[0]?.b;
      edit.c = res.data.answers[0]?.c;
      edit.d = res.data.answers[0]?.d;
      edit.true_answer = res.data.answers[0]?.true_answer;
      edit.question_id = res.data.id;
      edit.id = id;
      edit.toggle = true;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const createProduct = () => {
  axios
    .post(
      "/question",
      {
        question: form.question,
        test_group_id: +router.currentRoute?.value?.params?.name,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      if (!form.true_answer) {
        axios.delete(`/question/${res.data.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        notification.warning("To'g'ri javobni belgilang!");
        return;
      }
      getProduct();
      let data = {
        a: form.a,
        b: form.b,
        c: form.c,
        d: form.d,
        true_answer: form.true_answer,
        question_id: res.data.id,
      };
      axios
        .post("/answer", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          notification.success("Muvaffaqiyatli qo'shildi");
          modal.value = false;
          getProduct();
        })
        .catch((error) => {
          notification.warning(error.response.data.message);
          console.log("error", error);
        });
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
      console.log("error", error);
    });
};

const getSubject = () => {
  axios
    .get("/subject", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      store.subjects = res.data || [{ title: "Fan yaratilmagan" }];
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const editProduct = () => {
  axios
    .patch(
      `/question/${edit.id}`,
      {
        question: edit.question,
        test_group_id: +router.currentRoute?.value?.params?.name,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      let data = {
        a: edit.a,
        b: edit.b,
        c: edit.c,
        d: edit.d,
        true_answer: edit.true_answer,
        question_id: res.data.question.id,
      };
      axios
        .patch(`/answer/${res.data.question?.answers[0]?.id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          getProduct();
          notification.success("Muvaffaqiyatli o'zgartirildi");
          edit.toggle = false;
        })
        .catch((error) => {
          notification.warning(error.response.data.message);
          console.log("error", error);
        });
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
      console.log("error", error);
    });
};

const deleteProduct = () => {
  axios
    .delete(`/question/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success(res.data.message);
      getProduct();
      remove.toggle = false;
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
      console.log("error", error);
    });
};

const getGuard = () => {
  axios
    .get("/staff", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      axios
        .delete("/staff/1", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {})
        .catch((error) => {
          if (error.response.data.message == "Admin huquqi sizda yo'q!") {
            store.guard = "o'qituvchi";
          }
        });
    })
    .catch((error) => {
      if (error.response.data.message == "Admin huquqi sizda yo'q!") {
        store.guard = "o'quvchi";
      }
      store.error = true;
      store.allProducts = error.response.data.message;
    });
};

onMounted(() => {
  getGuard();
  getProduct();
  getSubject();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(
    to right,
    white -450%,
    #4141eb
  );
}
.btnAdd {
  background-image: linear-gradient(
    to right,
    white -450%,
    #4141eb
  );
}

.btnKirish {
  background-image: linear-gradient(
    to right,
    white -450%,
    #4141eb
  );
}

.btnOrqaga {
  background-image: linear-gradient(
    to right,
    white -450%,
    #4141eb
  );
}
</style>
