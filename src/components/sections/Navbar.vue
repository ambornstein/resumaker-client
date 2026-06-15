<template>
    <div className="w-full bg-contrast/40">
        <div className="container m-auto px-4 py-2 md:px-8 flex flex-row gap-4">
            <RouterLink to="/profile" class="hover:bg-link/40 p-1" active-class="hover:bg-link/40 p-1 bg-link/20">
                <h3>Profile</h3>
            </RouterLink>
            <RouterLink  to="/dashboard" class="hover:bg-link/40 p-1" active-class="hover:bg-link/40 p-1 bg-link/20">
                <h3>Resumes</h3>
            </RouterLink>
        </div>
    </div>
</template>