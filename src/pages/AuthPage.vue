<script setup lang="ts">

const authMode: "login" | "signup" = "login"

</script>
<template>
    <div className="max-w-lg m-auto">
        <div className="flex flex-col gap-2 p-12 border border-zinc-400 bg-zinc-800">
            <h2>Welcome To ResuMaker</h2>
            <div>
                <button>Log In</button>
                <button>Sign Up</button>
            </div>

            <form v-if="authMode == 'login'" className="flex flex-col gap-2">
                <label for="email">Email</label>
                <input type="email" id="email" />
                <label for="password"></label>
                <input type="password" id="password" />
                <input type="submit" />
            </form>
            <form v-else-if="authMode == 'signup'" className="flex flex-col gap-2">
                <label for="email">Email</label>
                <input type="email" id="email" />
                <label for="password"></label>
                <input type="password" id="password" />
                <input type="submit" />
            </form>
            <hr />
            <p>Or Authenticate With</p>
            <button>LinkedIn</button>
            <button>Github</button>
            <button>Google</button>
        </div>
    </div>
</template>