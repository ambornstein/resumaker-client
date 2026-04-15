<script setup lang="ts">

</script>

<template>
    <div className="flex flex-col gap-4">
        <section className="m-auto h-125 flex items-center gap-20">
            <div className="flex flex-col gap-8 flex-3 max-w-175">
                <h1 className="tracking-widest font-semibold">Rethink the Way You Build Résumés</h1>
                <h2>With just one profile, it's easy to create many resumes, each tailored to show specific
                    qualifications.</h2>
            </div>
            <div className="flex-2 overflow-clip">
                <div className="m-auto border-light h-110 aspect-[1/1.4] p-8 flex flex-col gap-1">
                    <div className="bg-contrast h-4 w-[70%] rounded-md mx-auto mb-4"></div>

                    <div className="bg-contrast h-2 w-[25%] rounded-md"></div>
                    <hr className="mb-1" />

                    <div className="grid grid-cols-4 gap-1 mt-2 animate-flow-reverse">
                        <div className="bg-contrast h-2 rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-3 rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                    </div>

                    <div className="bg-contrast h-2 w-[25%] rounded-md mt-2"></div>
                    <hr className="mb-1" />

                    <div className="grid grid-cols-4 gap-1 mt-2">
                        <div className="bg-contrast h-2 rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-3 rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-1 mt-2">
                        <div className="bg-contrast h-2 rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-3 rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                    </div>

                    <div className="bg-contrast h-2 w-[25%] rounded-md mt-2"></div>
                    <hr className="mb-1" />

                    <div className="grid grid-cols-4 gap-1 mt-2 animate-flow">
                        <div className="bg-contrast h-2 rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-3 rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                        <div className="bg-contrast h-2 col-span-full rounded-md ml-5"></div>
                    </div>
                </div>

            </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 w-[80%] m-auto">
            <div className="border-thick p-4 bg-panel flex flex-col gap-4">
                <span className="text-3xl px-4 py-2 bg-highlight rounded-sm mx-auto">1</span>
                <h2 className="text-center">Create a profile of your qualifications.</h2>
            </div>
            <div className="border-thick p-4 bg-panel flex flex-col gap-4">
                <span className="text-3xl px-4 py-2 bg-highlight rounded-sm mx-auto">2</span>
                <h2 className="text-center">Pick the most relevant experience and projects.</h2>
            </div>
            <div className="border-thick p-4 bg-panel flex flex-col gap-4">
                <span className="text-3xl px-4 py-2 bg-highlight rounded-sm mx-auto">3</span>
                <h2 className="text-center">Get a new resume instantly.</h2>
            </div>

        </section>
        <!-- <section className="bg-panel h-125 w-full mt-12">

        </section> -->
    </div>
</template>